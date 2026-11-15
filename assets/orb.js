// Natem · figura 3D del hero: esfera satinada con anillo y satélites (Three.js, sin texturas).
import * as THREE from "../vendor/three.module.js";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = /* glsl */ `
uniform float uTime; uniform float uWobble;
varying vec3 vN; varying vec3 vV;
${NOISE}
void main(){
  float d = snoise(normal*1.15 + uTime*.16) * uWobble;
  vec3 p = position + normal*d;
  vec4 mv = modelViewMatrix * vec4(p,1.);
  vN = normalize(normalMatrix * normalize(normal + d*.6*vec3(snoise(normal*2.+uTime*.1))));
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uAlpha;
varying vec3 vN; varying vec3 vV;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec3 n = normalize(vN);
  vec3 l = normalize(vec3(-.55,.75,.6));
  float g = dot(n,l)*.5+.5;
  float f = pow(1.-max(dot(n,vV),0.),2.4);
  vec3 col = mix(uC, uB, smoothstep(0.,.55,g));
  col = mix(col, uA, smoothstep(.45,1.,g));
  col = mix(col, vec3(1.), smoothstep(.82,1.,g)*.55);
  float spec = pow(max(dot(reflect(-l,n),vV),0.),38.);
  col += spec*.35 + f*vec3(1.,.9,.97)*.42;
  col += (hash(gl_FragCoord.xy)-.5)*.045;
  gl_FragColor = vec4(col, uAlpha);
}`;

const PALETTES = {
  rose: ["#ffe1ea", "#ee8fb6", "#7d4aa6"],
  violet: ["#f1e4ff", "#a878d6", "#3f2259"],
  pearl: ["#ffffff", "#e7c9e6", "#9a7cc6"],
};

function material(colors, wobble, alpha = 1) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: alpha < 1,
    uniforms: {
      uTime: { value: 0 },
      uWobble: { value: wobble },
      uAlpha: { value: alpha },
      uA: { value: new THREE.Color(colors[0]) },
      uB: { value: new THREE.Color(colors[1]) },
      uC: { value: new THREE.Color(colors[2]) },
    },
  });
}

function mount(stage) {
  const canvas = stage.querySelector("canvas");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return;
  }
  stage.classList.add("webgl");
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const pal = PALETTES[stage.dataset.palette] || PALETTES.rose;
  const alt = stage.dataset.palette === "violet" ? PALETTES.rose : PALETTES.violet;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);
  const mats = [material(pal, 0.09), material(alt, 0.03), material(PALETTES.pearl, 0.03), material(PALETTES.pearl, 0, 0.9)];
  const main = new THREE.Mesh(new THREE.SphereGeometry(1.55, 128, 128), mats[0]);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.045, 24, 200), mats[3]);
  ring.rotation.set(1.25, 0.25, 0);
  const moonA = new THREE.Mesh(new THREE.SphereGeometry(0.34, 48, 48), mats[1]);
  const moonB = new THREE.Mesh(new THREE.SphereGeometry(0.2, 48, 48), mats[2]);
  group.add(main, ring, moonA, moonB);

  const offset = (stage.dataset.offset || "0,0").split(",").map(Number);
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / innerWidth - 0.5) * 2;
    pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
  });

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const s = Math.min(1, (w / h) * 1.05);
    group.scale.setScalar(s);
    group.position.set(offset[0] * (w / h), offset[1], 0);
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(stage);

  function frame(ms) {
    const t = ms / 1000;
    if (visible) {
      mats.forEach((m) => (m.uniforms.uTime.value = t));
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      group.rotation.y = pointer.x * 0.35;
      group.rotation.x = pointer.y * 0.2;
      ring.rotation.z = t * 0.12;
      moonA.position.set(Math.cos(t * 0.35) * 2.35, Math.sin(t * 0.35) * 0.7 + 0.2, Math.sin(t * 0.35) * 2.0);
      moonB.position.set(Math.cos(t * 0.5 + 2.4) * 2.0, -1.5 + Math.sin(t * 0.6) * 0.25, Math.sin(t * 0.5 + 2.4) * 1.4);
      main.position.y = Math.sin(t * 0.7) * 0.08;
      renderer.render(scene, camera);
    }
    if (!still) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.querySelectorAll(".stage[data-orb]").forEach(mount);
