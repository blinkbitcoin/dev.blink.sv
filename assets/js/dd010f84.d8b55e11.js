"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[467],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,h=u["".concat(c,".").concat(m)]||u[m]||d[m]||l;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:r,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4746:(e,t,n)=>{n.d(t,{H:()=>o,a:()=>l});var a=n(7294);const r=(0,a.createContext)(),l=()=>(0,a.useContext)(r),o=e=>{let{children:t}=e;const[n,l]=(0,a.useState)(null),[o,i]=(0,a.useState)("https://api.blink.sv/graphql"),[c,s]=(0,a.useState)(""),[p,u]=(0,a.useState)(""),d={authToken:n,setAuthToken:l,apiEndpoint:o,setApiEndpoint:i,accountWalletId:c,setAccountWalletId:s,paymentRequest:p,setPaymentRequest:u};return a.createElement(r.Provider,{value:d},t)}},5282:(e,t,n)=>{n.d(t,{f:()=>i});var a=n(7294),r=n(7900),l=n(4746),o=n(2620);function i(){const{authToken:e,apiEndpoint:t}=(0,l.a)(),[n,i]=(0,a.useState)(""),[c,s]=(0,a.useState)(null),[p,u]=(0,a.useState)(null),d="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          walletCurrency\n          balance\n          pendingIncomingBalance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,o.yL)({operation:d,setCurlCommand:i,authToken:e,apiEndpoint:t})}),[e,t]),a.createElement("div",null,a.createElement("button",{onClick:async()=>{u(null),s(null);try{const n=await(0,r.K)(e,t,d);s(n),(0,o.yL)({operation:d,setCurlCommand:i,authToken:e,apiEndpoint:t})}catch(n){u(n.message)}}},"Send the request"),a.createElement("div",{style:{marginTop:"10px"}}),p&&a.createElement("div",{style:{color:"red"}},"Error: ",p),c&&a.createElement("div",null,a.createElement("strong",null,"Response:")," ",a.createElement("pre",{style:{marginLeft:"10px"}},JSON.stringify(c,null,2))),a.createElement("div",{style:{marginTop:"20px",marginBottom:"40px"}},a.createElement("div",{style:{fontWeight:"bold"}},"curl command to check the balance of your wallets"),a.createElement("div",{style:{marginTop:"10px"}}),a.createElement("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"}},n)))}},4495:(e,t,n)=>{n.d(t,{k:()=>i});var a=n(7294),r=n(7900),l=n(4746),o=n(2620);function i(){const{authToken:e,apiEndpoint:t}=(0,l.a)(),[n,i]=(0,a.useState)(""),[c,s]=(0,a.useState)(null),[p,u]=(0,a.useState)(null),d="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          id\n          walletCurrency\n          balance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,o.yL)({operation:d,type:"wallet",setCurlCommand:i,authToken:e,apiEndpoint:t,walletCurrency:"BTC"})}),[e,t]),a.createElement("div",null,a.createElement("button",{onClick:async()=>{u(null),s(null);try{const n=await(0,r.K)(e,t,d);s(n),(0,o.yL)({operation:d,type:"wallet",setCurlCommand:i,authToken:e,apiEndpoint:t,walletCurrency:"BTC"})}catch(n){u(n.message)}}},"Send the request"),a.createElement("div",{style:{marginTop:"10px"}}),p&&a.createElement("div",{style:{color:"red"}},"Error: ",p),c&&a.createElement("div",null,a.createElement("strong",null,"Response:")," ",a.createElement("pre",{style:{marginLeft:"10px"}},JSON.stringify(c,null,2))),a.createElement("div",{style:{marginTop:"20px",marginBottom:"40px"}},a.createElement("div",{style:{fontWeight:"bold"}},"curl command to get the BTC wallet ID"),a.createElement("div",{style:{marginTop:"10px"}}),a.createElement("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"}},n)))}},2698:(e,t,n)=>{n.d(t,{k:()=>l});var a=n(7294),r=n(4746);function l(){const{apiEndpoint:e,setApiEndpoint:t}=(0,r.a)();return a.createElement("div",null,a.createElement("div",null,"The GraphQL endpoint to connect to:"),a.createElement("input",{type:"text",value:e,onChange:e=>{t(e.target.value)},readOnly:!0,style:{width:"50%",marginBottom:"10px"}}))}},65:(e,t,n)=>{n.d(t,{T:()=>l});var a=n(7294),r=n(4746);function l(){const{setAuthToken:e}=(0,r.a)();return a.createElement("div",null,a.createElement("div",null,"A valid authentication token is required in the header as a bearer token:"),a.createElement("input",{type:"text",placeholder:"Paste the authentication token to use it",onChange:t=>{e(t.target.value)},style:{width:"50%",marginBottom:"10px"}}))}},7900:(e,t,n)=>{n.d(t,{K:()=>a});const a=async function(e,t,n,a){if(void 0===a&&(a={}),!e)throw new Error("Not authenticated");if(!n)throw new Error("No GraphQL query provided");try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-API-KEY":`${e}`},body:JSON.stringify({query:n,variables:a})});if(!r.ok){const e=await r.text();throw new Error(`Error response from server: ${e}`)}const l=r.headers.get("content-type");if(l&&l.includes("application/json")){return await r.json()}throw new Error(`Unexpected content type: ${l}`)}catch(r){throw console.error("There was an error making the authenticated request:",r),r}}},2620:(e,t,n)=>{n.d(t,{yL:()=>a});function a(e){let{operation:t,type:n="",setCurlCommand:a,authToken:r,apiEndpoint:l,amount:o,paymentRequest:i="",walletId:c="",walletCurrency:s="",address:p}=e,u={query:t.trim(),variables:{}};const d=r?`--header 'X-API-KEY: ${r}'`:"--header 'X-API-KEY: <YOUR_AUTH_TOKEN_HERE>'";"invoice"===n?u.variables.input={amount:o.toString(),walletId:c}:"feeProbe"===n||"lnInvoicePaymentSend"===n?u.variables.input={paymentRequest:i,walletId:c}:"onChainTxFee"===n?u.variables={walletId:c,address:p,amount:o}:"onChainSend"===n&&(u.variables.input={walletId:c,address:p,amount:o});let m=JSON.stringify(u).replace(/\n/g,"");a("wallet"===n?`curl -sS --request POST --header 'content-type: application/json' \\\n  ${d} \\\n  --url '${l}' \\\n  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}' \\\n| jq '.data.me.defaultAccount.wallets[] | select(.walletCurrency == "${s}") .id'`:`curl --request POST --header 'content-type: application/json' \\\n  ${d} \\\n  --url '${l}' \\\n  --data '${m}'`)}},2710:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>v,contentTitle:()=>y,default:()=>w,frontMatter:()=>h,metadata:()=>g,toc:()=>f});var a=n(7462),r=n(7294),l=n(3905),o=n(4746),i=n(2698),c=n(65),s=n(4495),p=n(7900),u=n(2620);function d(){const{authToken:e,apiEndpoint:t,accountWalletId:n,setAccountWalletId:a}=(0,o.a)(),[l,i]=(0,r.useState)(""),[c,s]=(0,r.useState)(null),[d,m]=(0,r.useState)(null),h="mutation onChainAddressCreate($input: OnChainAddressCreateInput!) {\n  onChainAddressCreate(input: $input) {\n    address\n    errors {\n      message\n    }\n  }\n}";(0,r.useEffect)((()=>{(0,u.yL)({operation:h,setCurlCommand:i,authToken:e,apiEndpoint:t,walletId:n})}),[e,t,n]);return r.createElement("div",null,r.createElement("div",null,r.createElement("div",{style:{fontWeight:"bold"}},"Set the BTC wallet ID:"),r.createElement("label",null,r.createElement("input",{type:"text",value:n,onChange:e=>{a(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the BTC wallet ID from the response above"}))),r.createElement("div",{style:{marginTop:"10px"}}),r.createElement("button",{onClick:async()=>{m(null),s(null);const a={input:{walletId:n}};try{const r=await(0,p.K)(e,t,h,a);s(r),(0,u.yL)({operation:h,setCurlCommand:i,authToken:e,apiEndpoint:t,walletId:n})}catch(r){m(r.message)}}},"Create a new address"),r.createElement("div",{style:{marginTop:"10px"}}),d&&r.createElement("div",{style:{color:"red"}},"Error: ",d),c&&r.createElement("div",null,r.createElement("strong",null,"Response:")," ",r.createElement("pre",{style:{marginLeft:"10px"}},JSON.stringify(c,null,2))),r.createElement("div",{style:{marginTop:"20px",marginBottom:"40px"}},r.createElement("div",{style:{fontWeight:"bold"}},"curl command to generate a new address"),r.createElement("div",{style:{marginTop:"10px"}}),r.createElement("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"}},l)))}var m=n(5282);const h={id:"btc-onchain-receive",title:"Receive BTC onchain",slug:"/api/btc-onchain-receive"},y=void 0,g={unversionedId:"api/btc-onchain-receive",id:"api/btc-onchain-receive",title:"Receive BTC onchain",description:"Get the wallet IDs and check the balances",source:"@site/docs/api/btc-onchain-receive.mdx",sourceDirName:"api",slug:"/api/btc-onchain-receive",permalink:"/api/btc-onchain-receive",draft:!1,tags:[],version:"current",frontMatter:{id:"btc-onchain-receive",title:"Receive BTC onchain",slug:"/api/btc-onchain-receive"},sidebar:"apiSidebar",previous:{title:"Send USD over Lightning",permalink:"/api/usd-ln-send"},next:{title:"Send BTC onchain",permalink:"/api/btc-onchain-send"}},v={},f=[{value:"Get the wallet IDs and check the balances",id:"get-the-wallet-ids-and-check-the-balances",level:3},{value:"Generate a new address to receive BTC",id:"generate-a-new-address-to-receive-btc",level:3},{value:"Once paid check the balance again",id:"once-paid-check-the-balance-again",level:3}],b={toc:f},k="wrapper";function w(e){let{components:t,...n}=e;return(0,l.kt)(k,(0,a.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(o.H,{mdxType:"AuthProvider"},(0,l.kt)(i.k,{mdxType:"SetApiEndpoint"}),(0,l.kt)(c.T,{mdxType:"SetAuthToken"}),(0,l.kt)("h3",{id:"get-the-wallet-ids-and-check-the-balances"},"Get the wallet IDs and check the balances"),(0,l.kt)("p",null,"Can run this query at any stage to confirm the change in the balances.",(0,l.kt)("br",null),'\nThe "BTC" wallet balance is denominated in satoshis.',(0,l.kt)("br",null),'\nThe "USD" wallet balance is in cents.'),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"The body of the GraphQL request")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        id\n        walletCurrency\n        balance\n      }\n    }\n  }\n}\n")),(0,l.kt)(s.k,{mdxType:"GetWalletDataBtc"}),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"generate-a-new-address-to-receive-btc"},"Generate a new address to receive BTC"),(0,l.kt)("p",null,"Receive satoshis to your BTC balance.",(0,l.kt)("br",null),"\nUse the ",(0,l.kt)("inlineCode",{parentName:"p"},"address")," from the response and send to it from any bitcoin wallet."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"The body of the GraphQL request")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation onChainAddressCreate($input: OnChainAddressCreateInput!) {\n  onChainAddressCreate(input: $input) {\n    address\n    errors {\n      message\n    }\n  }\n}\n")),(0,l.kt)(d,{mdxType:"OnChainAddressCreateBtc"}),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"once-paid-check-the-balance-again"},"Once paid check the balance again"),(0,l.kt)("p",null,"The balance will be updated once the transaction is confirmed on the blockchain.",(0,l.kt)("br",null),"\nUntil the confirmation the new incoming amount will show in the ",(0,l.kt)("inlineCode",{parentName:"p"},"pendingIncomingBalance")," field."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"The body of the GraphQL request")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        walletCurrency\n        balance\n        pendingIncomingBalance\n      }\n    }\n  }\n}\n")),(0,l.kt)(m.f,{mdxType:"GetBalanceWithPending"})),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"To test the GraphQL requests further use the GraphQL playground at ",(0,l.kt)("a",{parentName:"p",href:"https://api.blink.sv/graphql"},"api.blink.sv/graphql"),".",(0,l.kt)("br",null),"\nCheck out the ",(0,l.kt)("a",{parentName:"p",href:"https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ac3751d8-c116-408b-9129-d6e365da590b"},"Galoy API Postman collection")," to find examples in multiple programming languages.")))}w.isMDXComponent=!0}}]);