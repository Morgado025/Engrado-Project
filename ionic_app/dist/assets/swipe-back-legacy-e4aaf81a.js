System.register(["./index-legacy-9e73781c.js"],(function(t,e){"use strict";var n,r;return{setters:[t=>{n=t.c,r=t.a}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
const e=t=>t&&""!==t.dir?"rtl"===t.dir.toLowerCase():"rtl"===(null===document||void 0===document?void 0:document.dir.toLowerCase());
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */t("createSwipeBackGesture",((t,o,i,c,s)=>{const a=t.ownerDocument.defaultView;let d=e(t);const u=t=>d?-t.deltaX:t.deltaX;return n({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:n=>(d=e(t),(t=>{const{startX:e}=t;return d?e>=a.innerWidth-50:e<=50})(n)&&o()),onStart:i,onMove:t=>{const e=u(t)/a.innerWidth;c(e)},onEnd:t=>{const e=u(t),n=a.innerWidth,o=e/n,i=(t=>d?-t.velocityX:t.velocityX)(t),c=i>=0&&(i>.2||e>n/2),l=(c?1-o:o)*n;let h=0;if(l>5){const t=l/Math.abs(i);h=Math.min(t,540)}s(c,o<=0?.01:r(0,o,.9999),h)}})}))}}}));
