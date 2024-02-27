"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[106],{5818:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(4848),i=n(5680);const a={id:"oauth2",title:"OAuth2 integration",slug:"/api/oauth2"},o="OAuth2 integration",l={id:"api/oauth2",title:"OAuth2 integration",description:"OAuth2 is integrated in the API using Ory Hydra.",source:"@site/docs/api/oauth2.md",sourceDirName:"api",slug:"/api/oauth2",permalink:"/api/oauth2",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"oauth2",title:"OAuth2 integration",slug:"/api/oauth2"},sidebar:"apiSidebar",previous:{title:"Websocket connection",permalink:"/api/websocket"},next:{title:"Proof of payment",permalink:"/api/proof-of-payment"}},c={},s=[{value:"Adding a new application",id:"adding-a-new-application",level:2},{value:"More details",id:"more-details",level:2}];function h(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,i.RP)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"oauth2-integration",children:"OAuth2 integration"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://oauth.net/2/",children:"OAuth2"})," is integrated in the API using ",(0,r.jsx)(t.a,{href:"https://www.ory.sh/hydra/",children:"Ory Hydra"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["It is configured to accept login requests through the ",(0,r.jsx)(t.a,{href:"https://dashboard.blink.sv",children:"Blink Dashboard"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Account creation purely through the API is currently not allowed."}),"\n",(0,r.jsx)(t.h2,{id:"adding-a-new-application",children:"Adding a new application"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["A new application to use the OAuth2 flow needs to be manually approved to be able to generate a ",(0,r.jsx)(t.code,{children:"login_challenge"})," through Hydra"]}),"\n",(0,r.jsx)(t.li,{children:"the callback address where the user will be redirected to after login needs to be defined."}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["Please contact the dev team on ",(0,r.jsx)(t.a,{href:"https://chat.galoy.io",children:"chat.galoy.io"})," to use OAuth2 to integrate an external app with the Blink API."]}),"\n",(0,r.jsx)(t.h2,{id:"more-details",children:"More details"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["See the ",(0,r.jsx)(t.a,{href:"https://github.com/GaloyMoney/galoy/tree/main/apps/consent#readme",children:"readme of the Consent app"})]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,i.RP)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},5680:(e,t,n)=>{n.d(t,{RP:()=>s});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=s(n),u=i,f=p["".concat(c,".").concat(u)]||p[u]||h[u]||a;return n?r.createElement(f,o(o({ref:t},d),{},{components:n})):r.createElement(f,o({ref:t},d))}));d.displayName="MDXCreateElement"}}]);