// Three.js "sticky notes on the board" scene for the Toolbox section.
import * as THREE from 'three';

export async function mount(el, clusters, opts = {}) {
  const hand = opts.handFont || 'cursive';
  const sans = opts.sansFont || 'system-ui, sans-serif';
  await Promise.all([
    document.fonts.load(`700 76px ${hand}`),
    document.fonts.load(`600 32px ${sans}`),
    document.fonts.load(`400 26px ${sans}`),
  ]).catch(() => {});

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const cv = renderer.domElement;
  cv.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;outline:none';
  el.appendChild(cv);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdbe3ec, 1.7));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(-5, 7, 11);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0004;
  Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 9, bottom: -9, near: 1, far: 40 });
  scene.add(sun);

  const wall = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), new THREE.ShadowMaterial({ opacity: 0.12 }));
  wall.position.z = -0.7; wall.receiveShadow = true; scene.add(wall);

  const board = new THREE.Group(); scene.add(board);
  const W = 2.4, H = 3.0, aniso = renderer.capabilities.getMaxAnisotropy();

  function texFor(c) {
    const k = document.createElement('canvas'); k.width = 600; k.height = 750;
    const g = k.getContext('2d');
    g.fillStyle = c.bg; g.fillRect(0, 0, 600, 750);
    const grad = g.createLinearGradient(0, 0, 0, 750);
    grad.addColorStop(0, 'rgba(255,255,255,0.18)'); grad.addColorStop(1, 'rgba(75,72,62,0.05)');
    g.fillStyle = grad; g.fillRect(0, 0, 600, 750);
    g.fillStyle = '#4B483E'; g.font = `700 76px ${hand}`; g.fillText(c.title, 44, 118);
    g.fillStyle = '#6F6C62'; g.font = `400 26px ${sans}`; g.fillText(c.note, 46, 160);
    c.items.forEach((it, i) => {
      const y = 236 + i * 76;
      g.fillStyle = '#4B483E'; g.font = `600 32px ${sans}`; g.fillText(it, 46, y);
      g.fillStyle = 'rgba(75,72,62,0.16)'; g.fillRect(46, y + 22, 508, 2);
    });
    const t = new THREE.CanvasTexture(k); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso;
    return t;
  }
  function curledPlane() {
    const geo = new THREE.PlaneGeometry(W, H, 16, 20), p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      const u = Math.max(0, (-y / H) * 2 - 0.2), side = Math.max(0, (x / W) * 2);
      p.setZ(i, 0.16 * u * u + 0.08 * u * side * side);
    }
    geo.computeVertexNormals();
    return geo;
  }

  const notes = clusters.map((c, i) => {
    const pivot = new THREE.Group();
    const mesh = new THREE.Mesh(curledPlane(), new THREE.MeshStandardMaterial({ map: texFor(c), roughness: 0.92, side: THREE.DoubleSide }));
    mesh.castShadow = true; mesh.userData.idx = i; pivot.add(mesh);
    const tape = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.26), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, roughness: 0.6 }));
    tape.position.set(0, H / 2 - 0.02, 0.012); tape.rotation.z = (i % 2 ? 1 : -1) * 0.07; pivot.add(tape);
    board.add(pivot);
    return { pivot, mesh, baseRot: ((c.rot || 0) * Math.PI) / 180, home: new THREE.Vector3(), lift: 0 };
  });

  function layout() {
    const w = el.clientWidth, h = el.clientHeight || 1, a = w / h;
    renderer.setSize(w, h, false); camera.aspect = a;
    const wide = a > 1.25;
    notes.forEach((n, i) => wide
      ? n.home.set((i - 1.5) * 2.95, i % 2 ? -0.12 : 0.1, 0)
      : n.home.set(((i % 2) - 0.5) * 2.75, (0.5 - Math.floor(i / 2)) * 3.35, 0));
    const needW = wide ? 12.6 : 6, needH = wide ? 4.4 : 7.6, t = Math.tan(THREE.MathUtils.degToRad(15));
    camera.position.set(0, 0, Math.max(needH / 2 / t, needW / 2 / (t * a)) + 1);
    camera.updateProjectionMatrix();
  }

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let hover = -1, focus = -1, down = null, dragY = 0, over = false;
  const setNdc = e => { const b = cv.getBoundingClientRect(); ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); };
  const pick = () => { ray.setFromCamera(ndc, camera); const h = ray.intersectObjects(notes.map(n => n.mesh))[0]; return h ? h.object.userData.idx : -1; };
  const onMove = e => {
    setNdc(e); over = true;
    if (down) { const dx = e.clientX - down.x; down.moved = Math.max(down.moved, Math.abs(dx)); dragY = THREE.MathUtils.clamp(down.r + dx * 0.004, -0.55, 0.55); }
    hover = pick();
    cv.style.cursor = down && down.moved > 4 ? 'grabbing' : hover >= 0 ? 'pointer' : 'grab';
  };
  const onDown = e => { setNdc(e); down = { x: e.clientX, r: dragY, moved: 0 }; };
  const onUp = () => {
    if (!down) return;
    if (down.moved < 5) { const p = pick(); focus = p === focus ? -1 : p; opts.onFocus && opts.onFocus(focus); }
    down = null;
  };
  const onLeave = () => { over = false; hover = -1; ndc.set(0, 0); };
  const onKey = e => { if (e.key === 'Escape' && focus >= 0) { focus = -1; opts.onFocus && opts.onFocus(-1); } };
  cv.addEventListener('pointermove', onMove); cv.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp); cv.addEventListener('pointerleave', onLeave); window.addEventListener('keydown', onKey);

  const ro = new ResizeObserver(layout); ro.observe(el); layout();
  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }); io.observe(el);

  const clock = new THREE.Clock();
  let raf = 0, tAcc = 0;
  const tmp = new THREE.Vector3(), DIM = new THREE.Color(0.84, 0.84, 0.84), FULL = new THREE.Color(1, 1, 1);
  function frame() {
    raf = requestAnimationFrame(frame);
    if (!visible) { clock.getDelta(); return; }
    const dt = Math.min(clock.getDelta(), 0.05); tAcc += dt;
    const k = 1 - Math.exp(-dt * 7);
    if (!down) dragY += (0 - dragY) * (1 - Math.exp(-dt * 1.5));
    board.rotation.x += ((over ? -ndc.y * 0.05 : 0) - board.rotation.x) * k;
    board.rotation.y += ((over ? ndc.x * 0.08 : 0) + dragY - board.rotation.y) * k;
    const fz = camera.position.z * 0.42;
    notes.forEach((n, i) => {
      const f = focus === i, dim = focus >= 0 && !f;
      n.lift += ((hover === i && !f ? 1 : 0) - n.lift) * k;
      const bob = reduce || f ? 0 : Math.sin(tAcc * 0.6 + i * 1.7) * 0.025;
      if (f) tmp.set(0, 0, fz); else tmp.copy(n.home);
      if (!f) { tmp.y += bob; tmp.z += n.lift * 0.35 - (dim ? 0.25 : 0); }
      n.pivot.position.lerp(tmp, k);
      const rz = f ? 0 : n.baseRot * (1 - n.lift * 0.6);
      n.pivot.rotation.z += (rz - n.pivot.rotation.z) * k;
      n.pivot.rotation.x += ((f ? 0 : -n.lift * 0.08) - n.pivot.rotation.x) * k;
      n.pivot.rotation.y += ((f ? -board.rotation.y : 0) - n.pivot.rotation.y) * k;
      n.mesh.material.color.lerp(dim ? DIM : FULL, k);
    });
    renderer.render(scene, camera);
  }
  frame();

  return {
    release() { focus = -1; },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      cv.removeEventListener('pointermove', onMove); cv.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp); cv.removeEventListener('pointerleave', onLeave); window.removeEventListener('keydown', onKey);
      scene.traverse(o => { o.geometry && o.geometry.dispose(); const m = o.material; if (m) { m.map && m.map.dispose(); m.dispose(); } });
      renderer.dispose(); cv.remove();
    },
  };
}
