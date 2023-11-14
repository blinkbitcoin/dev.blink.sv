"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[190],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>y});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),p=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),s=p(n),m=r,y=s["".concat(c,".").concat(m)]||s[m]||d[m]||l;return n?a.createElement(y,o(o({ref:t},u),{},{components:n})):a.createElement(y,o({ref:t},u))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[s]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5818:(e,t,n)=>{n.d(t,{H:()=>o,a:()=>l});var a=n(7294);const r=(0,a.createContext)(),l=()=>(0,a.useContext)(r),o=e=>{let{children:t}=e;const[n,l]=(0,a.useState)(null),[o,i]=(0,a.useState)("https://api.blink.sv/graphql"),[c,p]=(0,a.useState)(""),[u,s]=(0,a.useState)(""),d={authToken:n,setAuthToken:l,apiEndpoint:o,setApiEndpoint:i,accountWalletId:c,setAccountWalletId:p,paymentRequest:u,setPaymentRequest:s};return a.createElement(r.Provider,{value:d},t)}},9042:(e,t,n)=>{n.d(t,{k:()=>i});var a=n(7294),r=n(4029),l=n(5818),o=n(3917);function i(){const{authToken:e,apiEndpoint:t}=(0,l.a)(),[n,i]=(0,a.useState)(""),[c,p]=(0,a.useState)(null),[u,s]=(0,a.useState)(null),d="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          id\n          walletCurrency\n          balance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,o.yL)({operation:d,type:"wallet",setCurlCommand:i,authToken:e,apiEndpoint:t,walletCurrency:"BTC"})}),[e,t]),a.createElement("div",null,a.createElement("button",{onClick:async()=>{s(null),p(null);try{const n=await(0,r.K)(e,t,d);p(n),(0,o.yL)({operation:d,type:"wallet",setCurlCommand:i,authToken:e,apiEndpoint:t,walletCurrency:"BTC"})}catch(n){s(n.message)}}},"Send the request"),a.createElement("div",{style:{marginTop:"10px"}}),u&&a.createElement("div",{style:{color:"red"}},"Error: ",u),c&&a.createElement("div",null,a.createElement("strong",null,"Response:")," ",a.createElement("pre",{style:{marginLeft:"10px"}},JSON.stringify(c,null,2))),a.createElement("div",{style:{marginTop:"20px",marginBottom:"40px"}},a.createElement("div",{style:{fontWeight:"bold"}},"curl command to get the BTC wallet ID"),a.createElement("div",{style:{marginTop:"10px"}}),a.createElement("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"}},n)))}},6273:(e,t,n)=>{n.d(t,{U:()=>i});var a=n(7294),r=n(4029),l=n(5818),o=n(3917);function i(){const{authToken:e,apiEndpoint:t,accountWalletId:n,setAccountWalletId:i,paymentRequest:c,setPaymentRequest:p}=(0,l.a)(),[u,s]=(0,a.useState)(""),[d,m]=(0,a.useState)(null),[y,h]=(0,a.useState)(null),g="mutation LnInvoicePaymentSend($input: LnInvoicePaymentInput!) {\n  lnInvoicePaymentSend(input: $input) {\n    status\n    errors {\n      message\n      path\n      code\n    }\n  }\n}";(0,a.useEffect)((()=>{(0,o.yL)({operation:g,type:"lnInvoicePaymentSend",setCurlCommand:s,authToken:e,apiEndpoint:t,walletId:n,paymentRequest:c})}),[e,t,c,n]);return a.createElement("div",null,a.createElement("div",null,a.createElement("div",{style:{fontWeight:"bold"}},"Set the variables"),a.createElement("div",null,a.createElement("label",null,a.createElement("div",null,"Invoice:"),a.createElement("input",{type:"text",value:c,onChange:e=>p(e.target.value),style:{marginLeft:"10px",width:"50%"},placeholder:"Paste a lightning invoice"}))),a.createElement("label",null,a.createElement("div",null,"BTC wallet ID:"),a.createElement("input",{type:"text",value:n,onChange:e=>{i(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the BTC wallet ID from the response above"}))),a.createElement("div",{style:{marginTop:"10px"}}),a.createElement("button",{onClick:async()=>{h(null),m(null);const a={input:{paymentRequest:c,walletId:n}};try{const l=await(0,r.K)(e,t,g,a);m(l),(0,o.yL)({operation:g,type:"lnInvoicePaymentSend",setCurlCommand:s,authToken:e,apiEndpoint:t,walletId:n,paymentRequest:c})}catch(l){h(l.message)}}},"Send payment"),a.createElement("div",{style:{marginTop:"10px"}}),y&&a.createElement("div",{style:{color:"red"}},"Error: ",y),d&&a.createElement("div",null,a.createElement("strong",null,"Response:")," ",a.createElement("pre",{style:{marginLeft:"10px"}},JSON.stringify(d,null,2))),a.createElement("div",{style:{marginTop:"20px"}},a.createElement("div",{style:{fontWeight:"bold"}},"curl command to pay an invoice"),a.createElement("div",{style:{marginTop:"10px"}}),a.createElement("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"}},u)))}},8723:(e,t,n)=>{n.d(t,{k:()=>l});var a=n(7294),r=n(5818);function l(){const{apiEndpoint:e,setApiEndpoint:t}=(0,r.a)();return a.createElement("div",null,a.createElement("div",null,"The GraphQL endpoint to connect to:"),a.createElement("input",{type:"text",value:e,onChange:e=>{t(e.target.value)},readOnly:!0,style:{width:"50%",marginBottom:"10px"}}))}},3828:(e,t,n)=>{n.d(t,{T:()=>l});var a=n(7294),r=n(5818);function l(){const{setAuthToken:e}=(0,r.a)();return a.createElement("div",null,a.createElement("div",null,"A valid authentication token is required in the header as a bearer token:"),a.createElement("input",{type:"text",placeholder:"Paste the authentication token to use it",onChange:t=>{e(t.target.value)},style:{width:"50%",marginBottom:"10px"}}))}},4029:(e,t,n)=>{n.d(t,{K:()=>a});const a=async function(e,t,n,a){if(void 0===a&&(a={}),!e)throw new Error("Not authenticated");if(!n)throw new Error("No GraphQL query provided");try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`bearer ${e}`},body:JSON.stringify({query:n,variables:a})});if(!r.ok){const e=await r.text();throw new Error(`Error response from server: ${e}`)}const l=r.headers.get("content-type");if(l&&l.includes("application/json")){return await r.json()}throw new Error(`Unexpected content type: ${l}`)}catch(r){throw console.error("There was an error making the authenticated request:",r),r}}},3917:(e,t,n)=>{n.d(t,{OP:()=>a,nM:()=>r,qF:()=>l,yL:()=>o});const a=(e,t)=>{const n={email:t};return`curl -X POST '${e}/email/code' \\\n  --header 'Content-Type: application/json' \\\n  --header 'Accept: application/json' \\\n  --data '${JSON.stringify(n)}'`},r=(e,t,n)=>{const a={query:"mutation login($input: UserLoginInput!) { userLogin(input: $input) { authToken } }",variables:{input:{phone:t,code:n}}};return`curl '${e}' \\\n  --header 'Content-Type: application/json' \\\n  --header 'Accept: application/json' \\\n  --data-binary '${JSON.stringify(a)}'`},l=(e,t,n)=>`curl -X POST '${`${e}/email/login`}' \\\n  --header 'Content-Type: application/json' \\\n  --header 'Accept: application/json' \\\n  --data '${JSON.stringify({code:n,emailLoginId:t})}'`;function o(e){let{operation:t,type:n="",setCurlCommand:a,authToken:r,apiEndpoint:l,amount:o,paymentRequest:i="",walletId:c="",walletCurrency:p="",address:u}=e,s={query:t.trim(),variables:{}};const d=r?`--header 'Authorization: Bearer ${r}'`:"--header 'Authorization: Bearer <YOUR_AUTH_TOKEN_HERE>'";"invoice"===n?s.variables.input={amount:o.toString(),walletId:c}:"feeProbe"===n||"lnInvoicePaymentSend"===n?s.variables.input={paymentRequest:i,walletId:c}:"onChainTxFee"===n?s.variables={walletId:c,address:u,amount:o}:"onChainSend"===n&&(s.variables.input={walletId:c,address:u,amount:o});let m=JSON.stringify(s).replace(/\n/g,"");a("wallet"===n?`curl -sS --request POST --header 'content-type: application/json' \\\n  ${d} \\\n  --url '${l}' \\\n  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}' \\\n| jq '.data.me.defaultAccount.wallets[] | select(.walletCurrency == "${p}") .id'`:`curl --request POST --header 'content-type: application/json' \\\n  ${d} \\\n  --url '${l}' \\\n  --data '${m}'`)}},875:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>v,contentTitle:()=>h,default:()=>k,frontMatter:()=>y,metadata:()=>g,toc:()=>f});var a=n(7462),r=n(7294),l=n(3905),o=n(5818),i=n(8723),c=n(3828),p=n(9042),u=n(4029),s=n(3917);function d(){const{authToken:e,apiEndpoint:t,accountWalletId:n,setAccountWalletId:a,paymentRequest:l,setPaymentRequest:i}=(0,o.a)(),[c,p]=(0,r.useState)(""),[d,m]=(0,r.useState)(null),[y,h]=(0,r.useState)(null),g="mutation lnInvoiceFeeProbe($input: LnInvoiceFeeProbeInput!) {\n  lnInvoiceFeeProbe(input: $input) {\n    errors {\n      message\n    }\n    amount\n  }\n}";(0,r.useEffect)((()=>{(0,s.yL)({operation:g,type:"feeProbe",setCurlCommand:p,authToken:e,apiEndpoint:t,walletId:n,paymentRequest:l})}),[e,t,l,n]);return r.createElement("div",null,r.createElement("div",null,r.createElement("div",{style:{fontWeight:"bold"}},"Set the variables"),r.createElement("div",null,r.createElement("label",null,r.createElement("div",null,"Invoice:"),r.createElement("input",{type:"text",value:l,onChange:e=>i(e.target.value),style:{marginLeft:"10px",width:"50%"},placeholder:"Paste a lightning invoice"}))),r.createElement("label",null,r.createElement("div",null,"BTC wallet ID:"),r.createElement("input",{type:"text",value:n,onChange:e=>{a(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the BTC wallet ID from the response above"}))),r.createElement("div",{style:{marginTop:"10px"}}),r.createElement("button",{onClick:async()=>{h(null),m(null);const a={input:{paymentRequest:l,walletId:n}};try{const r=await(0,u.K)(e,t,g,a);m(r),(0,s.yL)({operation:g,type:"feeProbe",setCurlCommand:p,authToken:e,apiEndpoint:t,walletId:n,paymentRequest:l})}catch(r){h(r.message)}}},"Probe fee"),r.createElement("div",{style:{marginTop:"10px"}}),y&&r.createElement("div",{style:{color:"red"}},"Error: ",y),d&&r.createElement("div",null,r.createElement("strong",null,"Response:")," ",r.createElement("pre",{style:{marginLeft:"10px"}},JSON.stringify(d,null,2))),r.createElement("div",{style:{marginTop:"20px",marginBottom:"40px"}},r.createElement("h4",null,"curl command to probe invoice fee"),r.createElement("div",{style:{marginTop:"10px"}}),r.createElement("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"}},c)))}var m=n(6273);const y={id:"btc-ln-send",title:"Send BTC over Lightning",slug:"/api/legacy/btc-ln-send"},h=void 0,g={unversionedId:"api/legacy/btc-ln-send",id:"api/legacy/btc-ln-send",title:"Send BTC over Lightning",description:"Get the wallet IDs and check the balances",source:"@site/docs/api/legacy/btc-ln-send.mdx",sourceDirName:"api/legacy",slug:"/api/legacy/btc-ln-send",permalink:"/api/legacy/btc-ln-send",draft:!1,tags:[],version:"current",frontMatter:{id:"btc-ln-send",title:"Send BTC over Lightning",slug:"/api/legacy/btc-ln-send"},sidebar:"apiSidebar",previous:{title:"Receive BTC on Lightning",permalink:"/api/legacy/btc-ln-receive"},next:{title:"Receive USD on Lightning",permalink:"/api/legacy/usd-ln-receive"}},v={},f=[{value:"Get the wallet IDs and check the balances",id:"get-the-wallet-ids-and-check-the-balances",level:3},{value:"Estimate the payment fee (probe)",id:"estimate-the-payment-fee-probe",level:3},{value:"Pay a lightning invoice",id:"pay-a-lightning-invoice",level:3}],b={toc:f},E="wrapper";function k(e){let{components:t,...n}=e;return(0,l.kt)(E,(0,a.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(o.H,{mdxType:"AuthProvider"},(0,l.kt)(i.k,{mdxType:"SetApiEndpoint"}),(0,l.kt)(c.T,{mdxType:"SetAuthToken"}),(0,l.kt)("h3",{id:"get-the-wallet-ids-and-check-the-balances"},"Get the wallet IDs and check the balances"),(0,l.kt)("p",null,"Can run this query at any stage to confirm the change in the balances.",(0,l.kt)("br",null),'\nThe "BTC" wallet balance is denominated in satoshis.',(0,l.kt)("br",null),'\nThe "USD" wallet balance is in cents.'),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"The body of the GraphQL request")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        id\n        walletCurrency\n        balance\n      }\n    }\n  }\n}\n")),(0,l.kt)(p.k,{mdxType:"GetWalletDataBtc"}),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"estimate-the-payment-fee-probe"},"Estimate the payment fee (probe)"),(0,l.kt)("p",null,"Estimate the cost of paying a lightning invoice. ",(0,l.kt)("br",null),"\nPayments to an other Blink user and to nodes with a direct channel are free."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"The body of the GraphQL request")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation lnInvoiceFeeProbe($input: LnInvoiceFeeProbeInput!) {\n  lnInvoiceFeeProbe(input: $input) {\n    errors {\n      message\n    }\n    amount\n  }\n}\n")),(0,l.kt)(d,{mdxType:"LnInvoiceFeeProbe"}),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"pay-a-lightning-invoice"},"Pay a lightning invoice"),(0,l.kt)("p",null,"Pay a BOLT11 invoice from your BTC balance."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"The body of the GraphQL request")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-graphql"},"mutation LnInvoicePaymentSend($input: LnInvoicePaymentInput!) {\n  lnInvoicePaymentSend(input: $input) {\n    status\n    errors {\n      message\n      path\n      code\n    }\n  }\n}\n")),(0,l.kt)(m.U,{mdxType:"LnInvoicePaymentSend"})),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"To test the GraphQL requests further use the GraphQL playground at ",(0,l.kt)("a",{parentName:"p",href:"https://api.blink.sv/graphql"},"api.blink.sv/graphql"),".",(0,l.kt)("br",null),"\nCheck out the ",(0,l.kt)("a",{parentName:"p",href:"https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ac3751d8-c116-408b-9129-d6e365da590b"},"Galoy API Postman collection")," to find examples in multiple programming languages.")))}k.isMDXComponent=!0}}]);