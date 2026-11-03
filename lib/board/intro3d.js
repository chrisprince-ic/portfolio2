// Small three.js layer around the portrait: a push pin, a magnet and a marker that follow the cursor.
import * as THREE from 'three';

export function mount(el, opts = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const cv = renderer.domElement;
  cv.style.cssText = 'display:block;width:100%;height:100%';
  el.appendChild(cv);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 20);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe4e2dc, 1.7));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(-5, 8, 12);
  scene.add(sun);

  const M = (c, r = 0.42, x = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, ...x });
  function marker() {
    const g = new THREE.Group(), cap = M(0xff5b2e), r = 0.15;
    const add = (geo, mat, y, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(0, y, z); g.add(m); };
    add(new THREE.CylinderGeometry(r, r, 1.7, 32), M(0xede6d8, 0.5), 0);
    add(new THREE.CylinderGeometry(r * 1.1, r * 1.1, 0.5, 32), cap, -0.72);
    add(new THREE.BoxGeometry(0.07, 0.42, 0.06), cap, -0.62, r * 1.15);
    add(new THREE.CylinderGeometry(r * 1.02, r * 1.02, 0.14, 32), cap, 0.56);
    add(new THREE.CylinderGeometry(r * 0.4, r, 0.3, 32), M(0x8a8478, 0.7), 1.0);
    add(new THREE.SphereGeometry(0.06, 16, 12), M(0xff5b2e, 0.4), 1.18);
    return g;
  }
  function pin() {
    const g = new THREE.Group(), c = M(0xf2d98b, 0.3);
    const add = (geo, mat, y) => { const m = new THREE.Mesh(geo, mat); m.position.y = y; g.add(m); };
    add(new THREE.CylinderGeometry(0.26, 0.3, 0.18, 32), c, 0);
    add(new THREE.CylinderGeometry(0.12, 0.2, 0.36, 24), c, -0.26);
    add(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 24), c, -0.47);
    add(new THREE.CylinderGeometry(0.02, 0.005, 0.45, 8), M(0xa5a39e, 0.25, { metalness: 0.8 }), -0.72);
    return g;
  }
  function magnet() {
    const g = new THREE.Group(), inner = new THREE.Group(), c = M(0xff5b2e, 0.32);
    inner.add(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.26, 40), c));
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), c);
    dome.scale.y = 0.35; dome.position.y = 0.13; inner.add(dome);
    inner.rotation.x = Math.PI / 2; g.add(inner);
    return g;
  }

  const objs = [
    { g: pin(), x: 0.5, y: 0.1, s: 1.05, rot: [0.5, 0, 0] },
    { g: magnet(), x: 0.21, y: 0.6, s: 0.8, rot: [0, 0, 0] },
    { g: marker(), x: 0.86, y: 0.86, s: 1, rot: [0.3, 0, 0.95] },
  ].map((o, i) => { scene.add(o.g); return { ...o, i, phase: i * 2.1, ang: new THREE.Vector3(), spin: new THREE.Vector3(), lift: 0, home: new THREE.Vector3() }; });

  function layout() {
    const w = el.clientWidth || 1, h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const halfH = Math.tan(THREE.MathUtils.degToRad(15)) * 20, halfW = halfH * camera.aspect;
    const k = (2 * halfH / h) * 58;
    objs.forEach(o => { o.g.scale.setScalar(o.s * k); o.home.set((o.x * 2 - 1) * halfW, (1 - o.y * 2) * halfH, 1); });
  }
  const ro = new ResizeObserver(layout); ro.observe(el); layout();

  const ndc = new THREE.Vector2(0, 0), ray = new THREE.Raycaster();
  let near = false;
  const toNdc = e => {
    const b = el.getBoundingClientRect();
    ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
    near = Math.abs(ndc.x) < 1.6 && Math.abs(ndc.y) < 1.6;
  };
  const onMove = e => toNdc(e);
  const onDown = e => {
    if (opts.isIdle && !opts.isIdle()) return;
    toNdc(e);
    if (Math.abs(ndc.x) > 1 || Math.abs(ndc.y) > 1) return;
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(objs.map(o => o.g), true)[0];
    if (!hit) return;
    const o = objs.find(o => { let p = hit.object; while (p) { if (p === o.g) return true; p = p.parent; } return false; });
    if (!o) return;
    o.spin.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12);
    o.lift = 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown);

  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
  io.observe(el);
  const clock = new THREE.Clock(), target = new THREE.Vector3();
  let raf = 0, t = 0;
  function frame() {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!visible || document.hidden) return;
    t += dt;
    const k = 1 - Math.exp(-dt * 6);
    objs.forEach(o => {
      o.spin.multiplyScalar(Math.exp(-dt * 2.4));
      o.ang.addScaledVector(o.spin, dt);
      o.ang.multiplyScalar(Math.exp(-dt * 1.4));
      o.lift *= Math.exp(-dt * 3);
      const bob = reduce ? 0 : Math.sin(t * 0.7 + o.phase) * 0.05;
      o.g.position.lerp(target.set(o.home.x, o.home.y + bob, o.home.z + o.lift * 1.5), k);
      const tx = near ? -ndc.y * 0.35 : 0, ty = near ? ndc.x * 0.45 : 0;
      o.g.rotation.x += (o.rot[0] + tx + o.ang.x - o.g.rotation.x) * k;
      o.g.rotation.y += (o.rot[1] + ty + o.ang.y - o.g.rotation.y) * k;
      o.g.rotation.z += (o.rot[2] + o.ang.z - o.g.rotation.z) * k;
    });
    renderer.render(scene, camera);
  }
  frame();

  return {
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      scene.traverse(o => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose(); });
      renderer.dispose(); cv.remove();
    },
  };
}
