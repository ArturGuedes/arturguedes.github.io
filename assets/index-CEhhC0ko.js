import{j as t,r as s,u as E,e as y}from"./index-D3GxNmel.js";import{C as j,a as N,U as i,V as P,b,u as F}from"./react-three-fiber.esm-B6rKKfpH.js";import{E as _,w as V,a as D}from"./util-5VB1nUNr.js";import{a as I}from"./App-hkA2kYLZ.js";const A=`
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`,U=`
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 8;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p - fbm(p + fbm(p2)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`,B=`
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;class L extends D{constructor(){const e=new Map([["colorNum",new i(4)],["pixelSize",new i(2)]]);super("RetroEffect",B,{uniforms:e}),this.uniforms=e}set colorNum(e){this.uniforms.get("colorNum").value=e}get colorNum(){return this.uniforms.get("colorNum").value}set pixelSize(e){this.uniforms.get("pixelSize").value=e}get pixelSize(){return this.uniforms.get("pixelSize").value}}const T=V(L),S=s.forwardRef((o,e)=>{const{colorNum:a,pixelSize:n}=o;return t.jsx(T,{ref:e,colorNum:a,pixelSize:n})});S.displayName="RetroEffect";function q({waveSpeed:o=.05,waveFrequency:e=3,waveAmplitude:a=.3,waveColor:n=[.5,.5,.5],colorNum:c=4,pixelSize:l=2,disableAnimation:z=!1,enableMouseInteraction:v=!0,mouseRadius:h=1}){const C=s.useRef(null),[w,M]=s.useState({x:0,y:0}),{viewport:m,size:d,gl:x}=N(),p=s.useRef({time:new i(0),resolution:new i(new P(0,0)),waveSpeed:new i(o),waveFrequency:new i(e),waveAmplitude:new i(a),waveColor:new i(new b(...n)),mousePos:new i(new P(0,0)),enableMouseInteraction:new i(v?1:0),mouseRadius:new i(h)});s.useEffect(()=>{const u=x.getPixelRatio(),r=Math.floor(d.width*u),f=Math.floor(d.height*u),g=p.current.resolution.value;(g.x!==r||g.y!==f)&&g.set(r,f)},[d,x]),F(({clock:u})=>{const r=p.current;z||(r.time.value=u.getElapsedTime()),r.waveSpeed.value=o,r.waveFrequency.value=e,r.waveAmplitude.value=a,r.waveColor.value.set(...n),r.enableMouseInteraction.value=v?1:0,r.mouseRadius.value=h,v&&r.mousePos.value.set(w.x,w.y)});const R=u=>{if(!v)return;const r=x.domElement.getBoundingClientRect(),f=x.getPixelRatio();M({x:(u.clientX-r.left)*f,y:(u.clientY-r.top)*f})};return t.jsxs(t.Fragment,{children:[t.jsxs("mesh",{ref:C,scale:[m.width,m.height,1],children:[t.jsx("planeGeometry",{args:[1,1]}),t.jsx("shaderMaterial",{vertexShader:A,fragmentShader:U,uniforms:p.current})]}),t.jsx(_,{children:t.jsx(S,{colorNum:c,pixelSize:l})}),t.jsxs("mesh",{onPointerMove:R,position:[0,0,.01],scale:[m.width,m.height,1],visible:!1,children:[t.jsx("planeGeometry",{args:[1,1]}),t.jsx("meshBasicMaterial",{transparent:!0,opacity:0})]})]})}function G({children:o,...e}){return t.jsx(j,{className:"w-full h-full relative",camera:{position:[0,0,6]},dpr:window.devicePixelRatio,gl:{antialias:!0,preserveDrawingBuffer:!0},...e,children:o})}function O(o,e=()=>{}){try{return o.addEventListener("change",e),()=>o.removeEventListener("change",e)}catch{return o.addListener(e),()=>o.removeListener(e)}}function W(o,e){return typeof window<"u"&&"matchMedia"in window?window.matchMedia(o).matches:!1}function Y(o,e){const[a,n]=s.useState(W(o)),c=s.useRef();return s.useEffect(()=>{if("matchMedia"in window)return c.current=window.matchMedia(o),n(c.current.matches),O(c.current,l=>n(l.matches))},[o]),a}function J(){const o=I(),e=s.useRef(0),{theme:a}=E(),n=Y("(width >= 40rem)");function c(){const l=e.current;e.current=l+1,l===10&&y.info("You did it!"),l===13&&(y.success("Unlock the Playground"),o({to:"/playground"}))}return t.jsx("div",{className:"flex flex-col min-w-screen min-h-screen h-screen overflow",children:t.jsx(G,{onClick:c,children:t.jsx(q,{waveColor:a==="dark"?[.25,.25,.25]:[.9,.9,.9],pixelSize:n?2:10,enableMouseInteraction:n,waveSpeed:.025,mouseRadius:.5,waveAmplitude:.25,waveFrequency:2})})})}export{J as component};
