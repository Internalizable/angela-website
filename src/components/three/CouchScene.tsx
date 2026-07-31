import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------
   The signature element. A soft clay couch — the logo's two speech
   bubbles, here a place to sit — breathing gently while pastel
   "thoughts" drift upward.

   No real-time shadow maps: Safari/Metal WebGL is flaky with PCFSoft
   depth textures (it dropped the whole couch). Instead a baked radial
   "contact shadow" grounds it — robust everywhere and cheaper.
   ------------------------------------------------------------------ */

const PALETTE = {
  seat: 0x7faa7f,
  back: 0x5d8a63,
  arm: 0x3f6147,
  cushion: 0xc7ddb9,
  base: 0x4c7355,
  leg: 0x2e4636,
};
const ORB_COLORS = [0xb7d3ac, 0xe7ad57, 0x82b2c4, 0xe0a08f, 0xd8e7ce];

/* The couch's real extents, in world units. Every part below is placed so
   that it physically overlaps its neighbour — the seat sits in the back,
   the plinth sits in the seat, the legs sit in the plinth — so the model
   never reads as loose floating pieces from any camera angle. */
const MODEL_W = 3.6; // arm to arm
const MODEL_H = 2.2; // leg tips to top of the backrest
// generous half-extents used for framing (covers the idle sway + bob)
const SAFE_HALF_W = 2.0;
const SAFE_HALF_H = 1.25;

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

  // backrest + seat (capsules lying along X, overlapping each other)
  pill(0.5, 1.8, PALETTE.back, [0, 0.58, -0.28], Math.PI / 2);
  pill(0.45, 1.8, PALETTE.seat, [0, -0.06, 0.16], Math.PI / 2);

  // two rounded cushions resting on the seat
  pill(0.33, 0.6, PALETTE.cushion, [-0.6, 0.16, 0.2], Math.PI / 2);
  pill(0.33, 0.6, PALETTE.cushion, [0.6, 0.16, 0.2], Math.PI / 2);

  // armrests — sunk into the ends of the seat and backrest
  pill(0.3, 0.5, PALETTE.arm, [-1.5, 0.16, 0.02]);
  pill(0.3, 0.5, PALETTE.arm, [1.5, 0.16, 0.02]);

  // a slim base rail tucked under the seat — grounds the couch without
  // reading as a crate
  pill(0.2, 2.2, PALETTE.base, [0, -0.46, 0.14], Math.PI / 2);

  // legs — each one runs a long way up, ending *inside* the seat capsule, so
  // there is no seam to come apart at any camera angle. Splayed a touch out.
  const legGeo = new THREE.CylinderGeometry(0.1, 0.075, 0.74, 16);
  const legMat = mat(PALETTE.leg, 0.6);
  for (const [x, z] of [
    [-1.1, 0.28],
    [1.1, 0.28],
    [-1.1, -0.28],
    [1.1, -0.28],
  ]) {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, -0.68, z);
    leg.rotation.z = x > 0 ? -0.09 : 0.09;
    leg.rotation.x = z > 0 ? 0.07 : -0.07;
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
    new THREE.PlaneGeometry(6.4, 3.4),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(0, -1.11, 0.1);
  mesh.renderOrder = -1;
  return mesh;
}

const FOV = 40;
const TAN_HALF_FOV = Math.tan((FOV / 2) * THREE.MathUtils.DEG2RAD);

/* Where the couch should land on screen, in CSS pixels, mirroring the hero's
   own grid: max-w-[1200px], px-[clamp(20px,5vw,64px)], gap-8,
   md:grid-cols-[1.08fr_0.92fr]. From md up the couch fills the second column
   (plus a little bleed into the gutter) so it never lands on the headline;
   below md it is centred behind the copy. */
function frameFor(w: number, h: number) {
  const pad = Math.min(64, Math.max(20, w * 0.05));
  const content = Math.min(1200, Math.max(240, w - pad * 2));
  const left = (w - content) / 2;
  const GAP = 32;
  const colA = (content - GAP) * (1.08 / 2);
  const colB = content - GAP - colA;
  const twoCol = w >= 768;

  return {
    centerPx: twoCol ? left + colA + GAP + colB / 2 : w / 2,
    // target on-screen size of the couch
    targetW: twoCol ? colB + GAP * 2 : w * 0.86,
    targetH: h * (twoCol ? 0.4 : 0.3),
    // on phones it sits low, behind the copy rather than through the headline
    dropY: twoCol ? 0 : 0.2,
  };
}

export default function CouchScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0xeef3e8, 12, 26);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.set(0, 0.55, 9);

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
    // The drawing buffer is sized in device pixels; the element itself must be
    // pinned to the mount in CSS pixels or it renders at devicePixelRatio times
    // its box (which pushed the couch clean off-screen on every retina display).
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    mount.appendChild(renderer.domElement);

    // ---- lighting: soft daylight + a warm fill for a friendly mood ----
    scene.add(new THREE.HemisphereLight(0xffffff, 0x6f9e72, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(-4, 6, 5);
    scene.add(key);
    const warm = new THREE.PointLight(0xe7ad57, 0.8, 30);
    warm.position.set(5, 2, 4);
    scene.add(warm);

    // ---- couch + its contact shadow + orbs, grouped so they move together ----
    const stage = new THREE.Group();
    const couch = makeCouch();
    stage.add(couch);
    stage.add(makeContactShadow());
    scene.add(stage);

    // ---- drifting "thought" orbs, orbiting the couch inside the stage ----
    const orbs: { mesh: THREE.Mesh; speed: number; sway: number; phase: number; baseX: number }[] = [];
    const orbGeo = new THREE.SphereGeometry(1, 24, 24);
    const orbCount = window.innerWidth < 768 ? 9 : 13;
    for (let i = 0; i < orbCount; i++) {
      const color = ORB_COLORS[i % ORB_COLORS.length];
      const r = THREE.MathUtils.randFloat(0.08, 0.2);
      const mesh = new THREE.Mesh(
        orbGeo,
        new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0, transparent: true, opacity: 0.95 }),
      );
      mesh.scale.setScalar(r);
      // kept inside the couch's own column so they never drift over the nav
      const baseX = THREE.MathUtils.randFloat(-1.9, 1.9);
      mesh.position.set(baseX, THREE.MathUtils.randFloat(-1.7, 1.7), THREE.MathUtils.randFloat(-1.4, 1.1));
      stage.add(mesh);
      orbs.push({
        mesh,
        speed: THREE.MathUtils.randFloat(0.12, 0.4),
        sway: THREE.MathUtils.randFloat(0.2, 0.6),
        phase: THREE.MathUtils.randFloat(0, Math.PI * 2),
        baseX,
      });
    }

    /* ---- responsive framing ----
       Solve for the camera distance that renders the couch at the intended
       CSS-pixel size, take whichever of the width/height targets asks for the
       smaller couch, then clamp its offset so it can never leave the frame.
       This holds at any aspect ratio — ultrawide, laptop, tablet, phone. */
    let baseX = 0;
    let baseY = 0;
    const place = (w: number, h: number) => {
      const aspect = w / h;
      const f = frameFor(w, h);

      const offsetFrac = (f.centerPx / w - 0.5) * 2; // couch centre, as a share of the half-width

      const zForWidth = (MODEL_W * w) / (2 * f.targetW * TAN_HALF_FOV * aspect);
      const zForHeight = (MODEL_H * h) / (2 * f.targetH * TAN_HALF_FOV);
      // ...and far enough back that the couch still clears the frame *after*
      // being pushed sideways — otherwise a narrow column (tablet portrait)
      // would drag it back over the copy instead of shrinking it.
      const zToFit = (SAFE_HALF_W + 0.15) / (1 - Math.abs(offsetFrac)) / (TAN_HALF_FOV * aspect);
      const camZ = THREE.MathUtils.clamp(Math.max(zForWidth, zForHeight, zToFit), 5, 32);

      const visHalfH = camZ * TAN_HALF_FOV;
      const visHalfW = visHalfH * aspect;

      const maxX = Math.max(0, visHalfW - SAFE_HALF_W - 0.15);
      const maxY = Math.max(0, visHalfH - SAFE_HALF_H - 0.15);
      baseX = THREE.MathUtils.clamp(offsetFrac * visHalfW, -maxX, maxX);
      baseY = THREE.MathUtils.clamp(-f.dropY * visHalfH, -maxY, maxY);

      camera.position.z = camZ;
      stage.position.set(baseX, baseY, 0);
      // keep the haze just behind the couch instead of at a fixed depth
      fog.near = camZ + 1.5;
      fog.far = camZ + 13;
    };

    // ---- responsive sizing ----
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      place(w, h);
      camera.updateProjectionMatrix();
      camera.lookAt(baseX * 0.12, baseY, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // ---- cursor parallax (desktop pointers only) ----
    // Applied to the couch itself, never the camera, so the framing solved
    // above stays exactly as computed.
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !reduceMotion) window.addEventListener("pointermove", onPointer);

    // ---- animation loop ----
    let raf = 0;
    let running = true;
    let t = 0;
    let last = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      if (!reduceMotion) {
        couch.position.y = Math.sin(t * 0.9) * 0.07;
        couch.rotation.y = THREE.MathUtils.lerp(couch.rotation.y, target.x * 0.26 - 0.14, 0.05);
        couch.rotation.x = THREE.MathUtils.lerp(couch.rotation.x, target.y * 0.1, 0.05);
        stage.position.x = THREE.MathUtils.lerp(stage.position.x, baseX + target.x * 0.14, 0.04);

        for (const o of orbs) {
          o.mesh.position.y += o.speed * dt;
          o.mesh.position.x = o.baseX + Math.sin(t * o.sway + o.phase) * 0.4;
          if (o.mesh.position.y > 1.9) o.mesh.position.y = -1.9;
        }
      } else {
        couch.rotation.y = -0.14;
        stage.position.x = baseX;
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
        last = performance.now();
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
    const onContextRestored = () => {
      if (running) return;
      running = true;
      resize();
      last = performance.now();
      tick();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

    // ---- cleanup ----
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
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

  return <div ref={mountRef} className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true" />;
}
