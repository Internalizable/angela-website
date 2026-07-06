import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------
   The signature element. A soft clay couch — the logo's two speech
   bubbles, here a place to sit — breathing gently while pastel
   "thoughts" drift upward. Cursor nudges the whole scene in 3D.

   No real-time shadow maps: Safari/Metal WebGL is flaky with PCFSoft
   depth textures (it dropped the whole couch). Instead a baked radial
   "contact shadow" grounds it — robust everywhere and cheaper.
   ------------------------------------------------------------------ */

const PALETTE = {
  seat: 0x7faa7f,
  back: 0x5d8a63,
  arm: 0x3f6147,
  cushion: 0xc7ddb9,
  leg: 0x2e4636,
};
const ORB_COLORS = [0xb7d3ac, 0xe7ad57, 0x82b2c4, 0xe0a08f, 0xd8e7ce];

function makeCouch(): THREE.Group {
  const couch = new THREE.Group();
  const mat = (color: number, roughness = 0.85) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });

  const pill = (
    radius: number,
    length: number,
    color: number,
    pos: [number, number, number],
    rotZ = 0,
  ) => {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 14, 28), mat(color));
    m.rotation.z = rotZ;
    m.position.set(...pos);
    couch.add(m);
    return m;
  };

  // backrest + seat (capsules lying along X)
  pill(0.52, 1.9, PALETTE.back, [0, 0.62, -0.25], Math.PI / 2);
  pill(0.46, 1.9, PALETTE.seat, [0, -0.1, 0.15], Math.PI / 2);

  // two rounded cushions resting on the seat
  pill(0.34, 0.55, PALETTE.cushion, [-0.62, 0.18, 0.18], Math.PI / 2);
  pill(0.34, 0.55, PALETTE.cushion, [0.62, 0.18, 0.18], Math.PI / 2);

  // armrests
  pill(0.3, 0.5, PALETTE.arm, [-1.5, 0.18, 0.05]);
  pill(0.3, 0.5, PALETTE.arm, [1.5, 0.18, 0.05]);

  // little legs
  const legGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.5, 16);
  for (const [x, z] of [
    [-1.35, 0.45],
    [1.35, 0.45],
    [-1.35, -0.45],
    [1.35, -0.45],
  ]) {
    const leg = new THREE.Mesh(legGeo, mat(PALETTE.leg, 0.6));
    leg.position.set(x, -0.78, z);
    couch.add(leg);
  }

  return couch;
}

/** A soft radial blob baked into a canvas — used as a fake ground shadow. */
function makeContactShadow(): THREE.Mesh {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(31,51,39,0.42)");
  g.addColorStop(0.55, "rgba(31,51,39,0.18)");
  g.addColorStop(1, "rgba(31,51,39,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 4),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.02;
  mesh.renderOrder = -1;
  return mesh;
}

export default function CouchScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xeef3e8, 9, 22);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.6, 8.6);

    // WebGL may be unavailable (old hardware, blockers, headless). If so we
    // bail quietly — the hero's CSS gradient stands in for the scene.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    // ---- lighting: soft daylight + a warm fill for a friendly mood ----
    scene.add(new THREE.HemisphereLight(0xffffff, 0x6f9e72, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(-4, 6, 5);
    scene.add(key);
    const warm = new THREE.PointLight(0xe7ad57, 0.8, 30);
    warm.position.set(5, 2, 4);
    scene.add(warm);

    // ---- couch + its contact shadow, grouped so they move together ----
    // The couch sits in the right half on wide screens while the camera looks
    // left-of-it, keeping the headline column clear; it centres on narrow ones.
    const stage = new THREE.Group();
    const couch = makeCouch();
    stage.add(couch);
    stage.add(makeContactShadow());
    scene.add(stage);
    let lookX = 0;

    // Frame the couch for the viewport so it's clearly visible at every size —
    // beside the headline on wide screens, a touch smaller-and-right on laptops
    // and tablets, gently centred on phones. Also zoom out for short/narrow
    // viewports (aspect) so it never gets cropped.
    const place = (w: number, h: number) => {
      const aspect = w / h;
      let stageX: number, camZ: number, scale: number;
      if (w >= 1180) {
        stageX = 2.5; lookX = 0.85; camZ = 8.6; scale = 1;
      } else if (w >= 1024) {
        stageX = 2.2; lookX = 0.7; camZ = 8.9; scale = 0.95;
      } else if (w >= 768) {
        stageX = 1.75; lookX = 0.55; camZ = 9.2; scale = 0.88;
      } else {
        stageX = 0; lookX = 0; camZ = 10.2; scale = 0.9;
      }
      // pull back further when the viewport is wide-but-short or very narrow
      if (aspect > 2) camZ += (aspect - 2) * 1.6;
      if (aspect < 1) camZ += (1 - aspect) * 2.4;
      stage.position.x = stageX;
      camera.position.z = camZ;
      couch.scale.setScalar(scale);
    };

    // ---- drifting "thought" orbs, biased to the couch's side ----
    const orbs: { mesh: THREE.Mesh; speed: number; sway: number; phase: number; baseX: number }[] = [];
    const orbGeo = new THREE.SphereGeometry(1, 24, 24);
    for (let i = 0; i < 15; i++) {
      const color = ORB_COLORS[i % ORB_COLORS.length];
      const r = THREE.MathUtils.randFloat(0.09, 0.28);
      const mesh = new THREE.Mesh(
        orbGeo,
        new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0, transparent: true, opacity: 0.95 }),
      );
      mesh.scale.setScalar(r);
      const baseX = THREE.MathUtils.randFloat(0.4, 5.2);
      mesh.position.set(baseX, THREE.MathUtils.randFloat(-2, 3.4), THREE.MathUtils.randFloat(-2, 2.2));
      scene.add(mesh);
      orbs.push({
        mesh,
        speed: THREE.MathUtils.randFloat(0.12, 0.4),
        sway: THREE.MathUtils.randFloat(0.2, 0.6),
        phase: THREE.MathUtils.randFloat(0, Math.PI * 2),
        baseX,
      });
    }

    // ---- responsive sizing ----
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      place(w, h);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // ---- cursor parallax (desktop pointers only) ----
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !reduceMotion) window.addEventListener("pointermove", onPointer);

    // ---- animation loop ----
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const tick = () => {
      const t = clock.getElapsedTime();

      if (!reduceMotion) {
        couch.position.y = Math.sin(t * 0.9) * 0.08;
        couch.rotation.y = THREE.MathUtils.lerp(couch.rotation.y, target.x * 0.32 - 0.12, 0.05);
        couch.rotation.x = THREE.MathUtils.lerp(couch.rotation.x, target.y * 0.12, 0.05);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, lookX + target.x * 0.5, 0.04);
        camera.lookAt(lookX, 0, 0);

        for (const o of orbs) {
          o.mesh.position.y += o.speed * 0.016;
          o.mesh.position.x = o.baseX + Math.sin(t * o.sway + o.phase) * 0.5;
          if (o.mesh.position.y > 3.6) o.mesh.position.y = -2.4;
        }
      } else {
        couch.rotation.y = -0.12;
        camera.position.x = lookX;
        camera.lookAt(lookX, 0, 0);
      }

      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(tick);
    };
    tick();

    // pause when the tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        clock.getDelta();
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // recover gracefully if the GPU drops the context
    const onContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    // ---- cleanup ----
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const m = obj.material as THREE.Material & { map?: THREE.Texture };
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else {
            m.map?.dispose();
            m.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
