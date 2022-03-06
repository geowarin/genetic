var H=Object.defineProperty,U=Object.defineProperties;var Z=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var E=(e,t,n)=>t in e?H(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||(t={}))G.call(t,n)&&E(e,n,t[n]);if(j)for(var n of j(t))K.call(t,n)&&E(e,n,t[n]);return e},A=(e,t)=>U(e,Z(t));import{j as P,r as M,a as O,n as $,b as J,u as Q,c as X,d as Y}from"./vendor.942cc90e.js";const V=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}};V();const f=1024,ee=20,p=P.exports.jsx,C=P.exports.jsxs,te=P.exports.Fragment;function ne({image:e,scale:t=1}){const n=M.exports.useRef(null);return M.exports.useEffect(()=>{const c=n.current;if(c===null)return;const o=c.getContext("2d");o.scale(t,t),o.drawImage(e.canvas,0,0),o.resetTransform()},[n]),p("canvas",{ref:n,width:f*t,height:f*t})}const oe=["aardvark","abacus","abundance","ache","acupuncture","airbrush","alien","anagram","angle","amazing","ankle","alphabet","antenna","aqua","asphalt","bacon","banana","bangles","banjo","bankrupt","bar","barracuda","basket","beluga","binder","birthday","bisect","blizzard","blunderbuss","boa","bog","bounce","broomstick","brought","bubble","budgie","bug","bug-a-boo","bugger","buff","burst","butter","buzz","cabana","cake","calculator","camera","candle","carnival","carpet","casino","cashew","catfish","ceiling","celery","chalet","chalk","chart","cheddar","chesterfield","chicken","chinchill","chit-chat","chocolate","chowder","coal","compass","compress","computer","conduct","contents","cookie","copper","corduroy","cow","cracker","crackle","croissant","cube","cupcake","curly","curtain","cushion","cuticle","daffodil","delicious","dictionary","dimple","ding-a-ling","disk","disco duck","dodo","dolphin","dong","donuts","dork","dracula","duct tape","effigy","egad","elastic","elephant","encasement","erosion","eyelash","fabulous","fantastic","feather","felafel","fetish","financial","finger","finite","fish","fizzle","fizzy","flame","flash","flavour","flick","flock","flour","flower","foamy","foot","fork","fritter","fudge","fungus","funny","fuse","fusion","fuzzy","garlic","gelatin","gelato","ghetto","glebe","glitter","glossy","groceries","goulashes","guacamole","gumdrop","haberdashery","hamster","happy","highlight","hippopotamus","hobbit","hold","hooligan","hydrant","icicles","idiot","implode","implosion","indeed","issue","itchy","jell-o","jewel","jump","kabob","kasai","kite","kiwi","ketchup","knob","laces","lacy","laughter","laundry","leaflet","legacy","leprechaun","lollypop","lumberjack","macadamia","magenta","magic","magnanimous","mango","margarine","massimo","mechanical","medicine","meh","melon","meow","mesh","metric","microphone","minnow","mitten","mozzarella","muck","mumble","mushy","mustache","nanimo","noodle","nostril","nuggets","oatmeal","oboe","o'clock","octopus","odour","ointment","olive","optic","overhead","ox","oxen","pajamas","pancake","pansy","paper","paprika","parmesan","pasta","pattern","pecan","peek-a-boo","pen","pepper","pepperoni","peppermint","perfume","periwinkle","photograph","pie","pierce","pillow","pimple","pineapple","pistachio","plush","polish","pompom","poodle","pop","popsicle","prism","prospector","prosper","pudding","puppet","puzzle","queer","query","radish","rainbow","ribbon","rotate","salami","sandwich","saturday","saturn","saxophone","scissors","scooter","scrabbleship","scrunchie","scuffle","shadow","sickish","silicone","slippery","smash","smooch","snap","snooker","socks","soya","spaghett","sparkle","spatula","spiral","splurge","spoon","sprinkle","square","squiggle","squirrel","statistics","stuffing","sticky","sugar","sunshine","super","swirl","taffy","tangy","tape","tat","teepee","telephone","television","thinkable","tip","tof","toga","trestle","tulip","turnip","turtle","tusks","ultimate","unicycle","unique","uranus","vegetable","waddle","waffle","wallet","walnut","wagon","window","whatever","whimsical","wobbly","yellow","zap","zebra","zigzag","zip"];function S(e,t){return Math.floor(Math.random()*(t-e+1))+e}function ae(){return S(1,ee)}function re(e){return e[S(0,e.length-1)]}function se(){return re(oe)}function D(){const e=document.createElement("canvas");return e.width=f,e.height=f,e.getContext("2d")}function ie(e){return F(e,{x:0,y:0,width:f,height:f})}function F(e,{x:t,y:n,width:c,height:o}){return new Promise(a=>{const r=new Image;r.onload=()=>{const h=D();h.drawImage(r,0,0,f,f);const d=h.getImageData(t,n,c,o);a(d)},r.src=e})}function ce(e){return`face-${e}.jpg`}function le(e){const t=D(),n=e.length,c=ue(n),o=c.map((a,r)=>F(ce(e[r]),a));return Promise.all(o).then(a=>{for(let r=0;r<n;r++){const{y:h,x:d}=c[r];t.putImageData(a[r],d,h)}return t})}function ue(e){const t=Math.sqrt(e),n=f/t;return Array.from({length:e}).map((c,o)=>{const a=Math.floor(o/t),r=o%t;return{x:a*n,y:r*n,width:n,height:n}})}function pe(e){return e.getImageData(0,0,f,f)}/**
 * @preserve
 * Copyright 2015 Igor Bezkrovny
 * All rights reserved. (MIT Licensed)
 *
 * ssim.ts - part of Image Quantization Library
 */const he=3;function de(e,t,n=8,c=.01,o=.03,a=!0,r=8){if(e.width!==t.width||e.height!==t.height)throw new Error("Images have different sizes!");const h=(1<<r)-1,d=Math.pow(c*h,2),g=Math.pow(o*h,2);let b=0,i=0,l=0;function m(w,k,y,s){let u,I,v;u=I=v=0;for(let x=0;x<w.length;x++)I+=Math.pow(w[x]-y,2),v+=Math.pow(k[x]-s,2),u+=(w[x]-y)*(k[x]-s);const z=w.length-1;I/=z,v/=z,u/=z;const T=(2*y*s+d)*(2*u+g),W=(Math.pow(y,2)+Math.pow(s,2)+d)*(I+v+g);i+=T/W,l+=(2*u+g)/(I+v+g),b++}return N._iterate(e,t,n,a,m),{ssim:i/b,mcs:l/b}}var N;(e=>{function t(o,a,r,h,d){const g=o.width,b=o.height;for(let i=0;i<b;i+=r)for(let l=0;l<g;l+=r){const m=Math.min(r,g-l),w=Math.min(r,b-i),k=n(o,l,i,m,w,h),y=n(a,l,i,m,w,h),s=c(k),u=c(y);d(k,y,s,u)}}e._iterate=t;function n(o,a,r,h,d,g,b=he){const i=o.data,l=new Float32Array(new ArrayBuffer(h*d*4));let m=0;const w=r+d;for(let k=r;k<w;k++){const y=k*o.width;let s=(y+a)*b;const u=(y+a+h)*b;switch(b){case 1:for(;s<u;)l[m++]=i[s++];break;case 2:for(;s<u;)l[m++]=i[s++]*(i[s++]/255);break;case 3:if(g)for(;s<u;)l[m++]=i[s++]*.212655+i[s++]*.715158+i[s++]*.072187;else for(;s<u;)l[m++]=i[s++]+i[s++]+i[s++];break;case 4:if(g)for(;s<u;)l[m++]=(i[s++]*.212655+i[s++]*.715158+i[s++]*.072187)*(i[s++]/255);else for(;s<u;)l[m++]=(i[s++]+i[s++]+i[s++])*(i[s++]/255);break}}return l}function c(o){let a=0;for(let r=0;r<o.length;r++)a+=o[r];return a/o.length}})(N||(N={}));const me=10,L=9,fe=4;function R(e){return Array.from({length:e})}function ge(){return R(L).map(ae)}function be(e){return t=>{const n=pe(t.face);return de(n,e).ssim}}async function ye(){const e=R(me).map(ge);return Promise.all(e.map(t=>B(se(),t)))}function we(e){return O(e).sortedByDescending(t=>t.rating).take(fe).toArray()}function B(e,t){return le(t).then(n=>({face:n,chromosome:t,id:$(),name:e}))}async function ke(e){const t=O(e).chunk(2).flatMap(([n,c])=>{const o=J(0,L-1).map(a=>Math.random()>.5?n.chromosome[a]:c.chromosome[a]).toArray();return B(n.name+" "+c.name,o)});return Promise.all(t)}function xe(e){return[]}function Ie(e){return[]}function ve(e){return t=>t.map(n=>A(_({},n),{rating:e(n)}))}async function Me(){const e=await ie("face-2.jpg"),t=ve(be(e)),n=t(await ye()),c=we(n),o=t(await ke(c)),a=t(Ie()),r=xe([...n,...a,...o]);return{population:n,selected:c,children:o,mutants:a,newPopulation:r}}function ze(){const e=Q(()=>Me());return C(te,{children:[p("h2",{children:"Population"}),p("div",{className:"portraits",children:e.population.map(t=>p(q,{person:t,className:X({selected:e.selected.includes(t)})},t.id))}),p("h2",{children:"Children"}),p("div",{className:"portraits",children:e.children.map(t=>p(q,{person:t},t.id))})]})}function q({person:e,className:t}){return C("div",{className:"portrait "+t,children:[p(ne,{image:e.face,scale:.2}),p("span",{children:e.name}),p("span",{children:e.rating})]})}Y.exports.render(p(M.exports.StrictMode,{children:p(M.exports.Suspense,{fallback:p("div",{children:"loading..."}),children:p(ze,{})})}),document.getElementById("root"));
