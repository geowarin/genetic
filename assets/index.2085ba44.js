import{j as P,r as R,R as k,a as W}from"./vendor.551c6e3d.js";const q=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}};q();function B(n,c){return Math.floor(Math.random()*(c-n+1))+n}function T(){return`face-${B(1,20)}.jpg`}/**
 * @preserve
 * Copyright 2015 Igor Bezkrovny
 * All rights reserved. (MIT Licensed)
 *
 * ssim.ts - part of Image Quantization Library
 */const G=4;function H(n,c,a=8,i=.01,t=.03,o=!0,s=8){if(n.width!==c.width||n.height!==c.height)throw new Error("Images have different sizes!");const h=(1<<s)-1,w=Math.pow(i*h,2),m=Math.pow(t*h,2);let g=0,r=0,l=0;function d(x,y,p,e){let f,M,E;f=M=E=0;for(let I=0;I<x.length;I++)M+=Math.pow(x[I]-p,2),E+=Math.pow(y[I]-e,2),f+=(x[I]-p)*(y[I]-e);const _=x.length-1;M/=_,E/=_,f/=_;const C=(2*p*e+w)*(2*f+m),F=(Math.pow(p,2)+Math.pow(e,2)+w)*(M+E+m);r+=C/F,l+=(2*f+m)/(M+E+m),g++}return D._iterate(n,c,a,o,d),{ssim:r/g,mcs:l/g}}var D;(n=>{function c(t,o,s,h,w){const m=t.width,g=t.height;for(let r=0;r<g;r+=s)for(let l=0;l<m;l+=s){const d=Math.min(s,m-l),x=Math.min(s,g-r),y=a(t,l,r,d,x,h),p=a(o,l,r,d,x,h),e=i(y),f=i(p);w(y,p,e,f)}}n._iterate=c;function a(t,o,s,h,w,m,g=G){const r=t.data,l=new Float32Array(new ArrayBuffer(h*w*4));let d=0;const x=s+w;for(let y=s;y<x;y++){const p=y*t.width;let e=(p+o)*g;const f=(p+o+h)*g;switch(g){case 1:for(;e<f;)l[d++]=r[e++];break;case 2:for(;e<f;)l[d++]=r[e++]*(r[e++]/255);break;case 3:if(m)for(;e<f;)l[d++]=r[e++]*.212655+r[e++]*.715158+r[e++]*.072187;else for(;e<f;)l[d++]=r[e++]+r[e++]+r[e++];break;case 4:if(m)for(;e<f;)l[d++]=(r[e++]*.212655+r[e++]*.715158+r[e++]*.072187)*(r[e++]/255);else for(;e<f;)l[d++]=(r[e++]+r[e++]+r[e++])*(r[e++]/255);break}}return l}function i(t){let o=0;for(let s=0;s<t.length;s++)o+=t[s];return o/t.length}})(D||(D={}));const u=1024,v=2,L=v*v,j=u/v,b=Array.from({length:L}).map((n,c)=>{const a=Math.floor(c/v),i=c%v;return{x:a*j,y:i*j,width:j,height:j}});function O(){const n=document.createElement("canvas");return n.width=u,n.height=u,n.getContext("2d")}function Z(n){return S(n,{x:0,y:0,width:u,height:u})}function S(n,{x:c,y:a,width:i,height:t}){return new Promise(o=>{const s=new Image;s.onload=()=>{const h=O();h.drawImage(s,0,0,u,u);const w=h.getImageData(c,a,i,t);o(w)},s.src=n})}const N=P.exports.jsx,A=P.exports.jsxs;function K(){const n=O(),c=b.map(a=>S(T(),a));return Promise.all(c).then(a=>{for(let t=0;t<L;t++){const{y:o,x:s}=b[t];n.putImageData(a[t],s,o)}const i=n.getImageData(0,0,u,u);return n.putImageData(i,0,0),{image:i,canvas:n.canvas}})}function U(){const n=R.exports.useRef(null),[c,a]=R.exports.useState();return R.exports.useEffect(()=>{const i=n.current;if(i===null)return;const t=i.getContext("2d");K().then(o=>{Z("face-2.jpg").then(s=>{const h=H(o.image,s);a(h),t.scale(.5,.5),t.drawImage(o.canvas,0,0)})})},[n]),A("div",{children:[A("h2",{children:["Result ",c==null?void 0:c.ssim]}),N("canvas",{ref:n,width:u,height:u})]})}k.render(N(W.StrictMode,{children:N(U,{})}),document.getElementById("root"));
