import M from"./CrwpzASm.js";import{d as L,a6 as z,af as P,a7 as j,A as D,o as E,bj as F,E as V,r as N,bf as U,i as u,G as f,w as m,g,S as t,n as c,c as S,J as k,F as w,aC as G,ae as A,e as J,t as K,bg as O}from"./Df_WzjS0.js";import{_ as q,a as H,b as Q,c as R,d as T}from"./Cf1tzdB8.js";import"./C7mL2Anh.js";const W={slots:{root:"relative group *:not-first:!my-0 *:not-first:!static my-5",list:"relative flex items-center gap-1 border border-[var(--ui-border-muted)] bg-[var(--ui-bg)] border-b-0 rounded-t-[calc(var(--ui-radius)*1.5)] overflow-x-auto p-2",indicator:"absolute left-0 inset-y-2 w-[var(--reka-tabs-indicator-size)] translate-x-[var(--reka-tabs-indicator-position)] transition-[translate,width] duration-200 bg-[var(--ui-bg-elevated)] rounded-[calc(var(--ui-radius)*1.5)] shadow-xs",trigger:["relative inline-flex items-center gap-1.5 text-[var(--ui-text)] data-[state=active]:text-[var(--ui-text-highlighted)] hover:bg-[var(--ui-bg-elevated)]/50 px-2 py-1.5 text-sm rounded-[calc(var(--ui-radius)*1.5)] disabled:cursor-not-allowed disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-primary)] focus:outline-none","transition-colors"],triggerIcon:"size-4 shrink-0",triggerLabel:"truncate"}},X=A;var $,B;const Y=G({extend:G(W),...((B=($=X.uiPro)==null?void 0:$.prose)==null?void 0:B.codeGroup)||{}}),Z=L({__name:"CodeGroup",props:z({defaultValue:{default:"0"},sync:{},class:{},ui:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(v){const s=v,p=P(),o=j(v,"modelValue"),n=Y(),b=D(()=>{var e,a;return((a=(e=p.default)==null?void 0:e.call(p))==null?void 0:a.flatMap(y).filter(Boolean))||[]});function y(e,a){var d,l,i,r;return typeof e.type=="symbol"?(d=e.children)==null?void 0:d.map(y):{label:((l=e.props)==null?void 0:l.filename)||((i=e.props)==null?void 0:i.label)||`${a}`,icon:(r=e.props)==null?void 0:r.icon,component:e}}E(()=>{if(s.sync){const e=`code-group-${s.sync}`,a=F(e,()=>localStorage.getItem(e));V(a,()=>{a.value&&(o.value=a.value)},{immediate:!0}),V(o,()=>{o.value&&(a.value=o.value,localStorage.setItem(e,o.value))})}});const I=N(1);return U(()=>I.value++),(e,a)=>{var d;return u(),f(t(Q),{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=l=>o.value=l),"default-value":e.defaultValue,"unmount-on-hide":!1,class:c(t(n).root({class:[s.class,(d=s.ui)==null?void 0:d.root]}))},{default:m(()=>{var l;return[g(t(H),{class:c(t(n).list({class:(l=s.ui)==null?void 0:l.list}))},{default:m(()=>{var i;return[g(t(q),{class:c(t(n).indicator({class:(i=s.ui)==null?void 0:i.indicator}))},null,8,["class"]),(u(!0),S(w,null,k(b.value,(r,_)=>{var h;return u(),f(t(R),{key:_,value:String(_),class:c(t(n).trigger({class:(h=s.ui)==null?void 0:h.trigger}))},{default:m(()=>{var x,C;return[g(M,{icon:r.icon,filename:r.label,class:c(t(n).triggerIcon({class:(x=s.ui)==null?void 0:x.triggerIcon}))},null,8,["icon","filename","class"]),J("span",{class:c(t(n).triggerLabel({class:(C=s.ui)==null?void 0:C.triggerLabel}))},K(r.label),3)]}),_:2},1032,["value","class"])}),128))]}),_:1},8,["class"]),(u(!0),S(w,null,k(b.value,(i,r)=>(u(),f(t(T),{key:r,value:String(r),"as-child":""},{default:m(()=>[(u(),f(O(i.component),{"hide-header":"",tabindex:"-1"}))]),_:2},1032,["value"]))),128))]}),_:1},8,["modelValue","default-value","class"])}}}),re=Object.assign(Z,{__name:"ProseCodeGroup"});export{re as default};
