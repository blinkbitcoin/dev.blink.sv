"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[810],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>k});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),s=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(r),d=n,k=c["".concat(p,".").concat(d)]||c[d]||h[d]||i;return r?a.createElement(k,o(o({ref:t},u),{},{components:r})):a.createElement(k,o({ref:t},u))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:n,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9594:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=r(7462),n=(r(7294),r(3905));const i={id:"auth",title:"Start with the Blink Dashboard",slug:"/api/auth"},o="Start with the [Blink Dashboard](https://dashboard.blink.sv)",l={unversionedId:"api/auth",id:"api/auth",title:"Start with the Blink Dashboard",description:"Register with a phone number or log in with your existing Blink account on dashboard.blink.sv.",source:"@site/docs/api/auth.mdx",sourceDirName:"api",slug:"/api/auth",permalink:"/api/auth",draft:!1,tags:[],version:"current",frontMatter:{id:"auth",title:"Start with the Blink Dashboard",slug:"/api/auth"},sidebar:"apiSidebar",previous:{title:"Intro",permalink:"/"},next:{title:"Receive BTC on Lightning",permalink:"/api/btc-ln-receive"}},p={},s=[{value:"Create an API key",id:"create-an-api-key",level:2},{value:"Use the API key",id:"use-the-api-key",level:2}],u={toc:s},c="wrapper";function h(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"start-with-the-blink-dashboard"},"Start with the ",(0,n.kt)("a",{parentName:"h1",href:"https://dashboard.blink.sv"},"Blink Dashboard")),(0,n.kt)("p",null,"Register with a phone number or log in with your existing Blink account on ",(0,n.kt)("a",{parentName:"p",href:"https://dashboard.blink.sv"},"dashboard.blink.sv"),".",(0,n.kt)("br",null),"\nUse the same credentials as with the ",(0,n.kt)("a",{parentName:"p",href:"https://gt.blink.sv"},"Blink wallet app"),"."),(0,n.kt)("h2",{id:"create-an-api-key"},"Create an API key"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"log in with your registered email or a phone number"),(0,n.kt)("li",{parentName:"ul"},"select ",(0,n.kt)("inlineCode",{parentName:"li"},"API Keys")," in the menu on the left"),(0,n.kt)("li",{parentName:"ul"},"create an API key with the ",(0,n.kt)("inlineCode",{parentName:"li"},"+")," button"),(0,n.kt)("li",{parentName:"ul"},"copy the API key and save it securely as a password")),(0,n.kt)("h2",{id:"use-the-api-key"},"Use the API key"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"try the interactive API tutorial on the next pages"),(0,n.kt)("li",{parentName:"ul"},"for your custom requests set the API key in the header as:",(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre"},'"X-API-KEY" "blink_..."\n'))),(0,n.kt)("li",{parentName:"ul"},"visit the GraphQL Playground at ",(0,n.kt)("a",{parentName:"li",href:"https://api.blink.sv/graphql"},"api.blink.sv/graphql")),(0,n.kt)("li",{parentName:"ul"},"check out the ",(0,n.kt)("a",{parentName:"li",href:"https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#f3e8e86e-67c1-411d-8208-03220fd1ed43"},"Galoy API Postman collection"))),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},"To use the legacy authentication token visit the ",(0,n.kt)("a",{parentName:"p",href:"/api/legacy/auth"},"/api/legacy/auth")," folder.")))}h.isMDXComponent=!0}}]);