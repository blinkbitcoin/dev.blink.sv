"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[651],{4940:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>v,contentTitle:()=>m,default:()=>j,frontMatter:()=>g,metadata:()=>x,toc:()=>y});var a=t(4848),r=t(5680),i=t(9340),l=t(9004),s=t(9814),o=t(3450),c=t(6540),d=t(7077),p=t(4796);function u(){const{authToken:e,apiEndpoint:n,accountWalletId:t,setAccountWalletId:r}=(0,i.A)(),[l,s]=(0,c.useState)(100),[o,u]=(0,c.useState)(""),[h,g]=(0,c.useState)(null),[m,x]=(0,c.useState)(null),v="mutation LnUsdInvoiceCreateOnBehalfOfRecipient($input: LnUsdInvoiceCreateOnBehalfOfRecipientInput!) {\n  lnUsdInvoiceCreateOnBehalfOfRecipient(input: $input) {\n    invoice {\n      paymentRequest\n      paymentHash\n      paymentSecret\n      satoshis\n    }\n    errors {\n      message\n    }\n  }\n}";(0,c.useEffect)((()=>{(0,p.lc)({operation:v,type:"lnInvoiceCreateOnBehalfOfRecipient",setCurlCommand:u,authToken:e,apiEndpoint:n,amount:l,recipientWalletId:t})}),[e,n,l,t]);return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"Set the variables"}),(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"Amount (USD cents):"}),(0,a.jsx)("input",{type:"number",value:l,onChange:e=>{s(e.target.value)},style:{marginLeft:"10px",width:"50%"}})]})]}),(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"USD wallet ID:"}),(0,a.jsx)("input",{type:"text",value:t,onChange:e=>{r(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the USD wallet ID from the response above"})]})]}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("button",{onClick:async()=>{x(null),g(null);const a={input:{amount:l.toString(),recipientWalletId:t}};try{const r=await(0,d.t)(e,n,v,a);g(r),(0,p.lc)({operation:v,type:"lnInvoiceCreateOnBehalfOfRecipient",setCurlCommand:u,authToken:e,apiEndpoint:n,amount:l,recipientWalletId:t})}catch(r){x(r.message)}},children:"Create a Stablesats invoice"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),m&&(0,a.jsxs)("div",{style:{color:"red"},children:["Error: ",m]}),h&&(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Response:"})," ",(0,a.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(h,null,2)})]}),(0,a.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to generate a Stablesats invoice"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:o})]})]})}var h=t(5243);const g={id:"usd-ln-receive",title:"Receive USD on Lightning",slug:"/api/usd-ln-receive"},m=void 0,x={id:"api/usd-ln-receive",title:"Receive USD on Lightning",description:"Get the wallet IDs and check the balances",source:"@site/docs/api/usd-ln-receive.mdx",sourceDirName:"api",slug:"/api/usd-ln-receive",permalink:"/api/usd-ln-receive",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"usd-ln-receive",title:"Receive USD on Lightning",slug:"/api/usd-ln-receive"},sidebar:"apiSidebar",previous:{title:"Send BTC over Lightning",permalink:"/api/btc-ln-send"},next:{title:"Send USD over Lightning",permalink:"/api/usd-ln-send"}},v={},y=[{value:"Get the wallet IDs and check the balances",id:"get-the-wallet-ids-and-check-the-balances",level:3},{value:"Generate a Stablesats invoice",id:"generate-a-stablesats-invoice",level:3},{value:"Once paid check the balance again",id:"once-paid-check-the-balance-again",level:3}];function f(e){const n={a:"a",admonition:"admonition",code:"code",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,r.RP)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i.O,{children:[(0,a.jsx)(l.a,{}),(0,a.jsx)(s.K,{}),(0,a.jsx)(n.h3,{id:"get-the-wallet-ids-and-check-the-balances",children:"Get the wallet IDs and check the balances"}),(0,a.jsxs)(n.p,{children:["Can run this query at any stage to confirm the change in the balances.",(0,a.jsx)("br",{}),'\nThe "BTC" wallet balance is denominated in satoshis.',(0,a.jsx)("br",{}),'\nThe "USD" wallet balance is in cents.']}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        id\n        walletCurrency\n        balance\n      }\n    }\n  }\n}\n"})}),(0,a.jsx)(o.S,{}),(0,a.jsx)(n.hr,{}),(0,a.jsx)(n.h3,{id:"generate-a-stablesats-invoice",children:"Generate a Stablesats invoice"}),(0,a.jsxs)(n.p,{children:["Using Stablesats a merchant can generate invoices denominated in USD cents. ",(0,a.jsx)("br",{}),"\nUse the ",(0,a.jsx)(n.code,{children:"paymentRequest"})," from the response and pay it with a lightning wallet.",(0,a.jsx)("br",{}),"\nThe satoshi amount of the invoice will reflect the current USD/BTC exchange rate and the balance will be kept at the dollar value."]}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"mutation LnUsdInvoiceCreateOnBehalfOfRecipient($input: LnUsdInvoiceCreateOnBehalfOfRecipientInput!) {\n  lnUsdInvoiceCreateOnBehalfOfRecipient(input: $input) {\n    invoice {\n      paymentRequest\n      paymentHash\n      paymentSecret\n      satoshis\n    }\n    errors {\n      message\n    }\n  }\n}\n"})}),(0,a.jsx)(u,{}),(0,a.jsx)(n.hr,{}),(0,a.jsx)(n.h3,{id:"once-paid-check-the-balance-again",children:"Once paid check the balance again"}),(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["There are multiple ways to get notified on the incoming payments: see ",(0,a.jsx)(n.a,{href:"/api/webhooks",children:"how to use webhooks (callbacks)"})," and ",(0,a.jsx)(n.a,{href:"/api/websocket",children:"websocket subscriptions"}),"."]})}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request to check the balance"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        walletCurrency\n        balance\n      }\n    }\n  }\n}\n"})}),(0,a.jsx)(h.d,{})]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["To test the GraphQL requests further use the GraphQL playground at ",(0,a.jsx)(n.a,{href:"https://api.blink.sv/graphql",children:"api.blink.sv/graphql"})," for mainnet or ",(0,a.jsx)(n.a,{href:"https://api.staging.galoy.io/graphql",children:"api.staging.galoy.io/graphql"})," for staging.",(0,a.jsx)("br",{}),"\nCheck out the ",(0,a.jsx)(n.a,{href:"https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ed78e464-9874-4bf7-9b7b-92e5a898db83",children:"Galoy API Postman collection"})," to find examples in multiple programming languages."]})})]})}function j(e={}){const{wrapper:n}={...(0,r.RP)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(f,{...e})}):f(e)}},5680:(e,n,t)=>{t.d(n,{RP:()=>c});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=a.createContext({}),c=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(t),h=r,g=u["".concat(o,".").concat(h)]||u[h]||d[h]||i;return t?a.createElement(g,l(l({ref:n},p),{},{components:t})):a.createElement(g,l({ref:n},p))}));p.displayName="MDXCreateElement"},9340:(e,n,t)=>{t.d(n,{A:()=>l,O:()=>s});var a=t(6540),r=t(4848);const i=(0,a.createContext)(),l=()=>(0,a.useContext)(i),s=e=>{let{children:n}=e;const[t,l]=(0,a.useState)(null),[s,o]=(0,a.useState)("https://api.blink.sv/graphql"),[c,d]=(0,a.useState)(""),[p,u]=(0,a.useState)(""),[h,g]=(0,a.useState)(""),[m,x]=(0,a.useState)(""),[v,y]=(0,a.useState)(""),f={authToken:t,setAuthToken:l,apiEndpoint:s,setApiEndpoint:o,accountWalletId:c,setAccountWalletId:d,paymentRequest:p,setPaymentRequest:u,lnAddress:h,setLnAddress:g,lnurl:m,setLnurl:x,amount:v,setAmount:y};return(0,r.jsx)(i.Provider,{value:f,children:n})}},5243:(e,n,t)=>{t.d(n,{d:()=>o});var a=t(6540),r=t(7077),i=t(9340),l=t(4796),s=t(4848);function o(){const{authToken:e,apiEndpoint:n}=(0,i.A)(),[t,o]=(0,a.useState)(""),[c,d]=(0,a.useState)(null),[p,u]=(0,a.useState)(null),h="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          walletCurrency\n          balance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,l.lc)({operation:h,setCurlCommand:o,authToken:e,apiEndpoint:n})}),[e,n]),(0,s.jsxs)("div",{children:[(0,s.jsx)("button",{onClick:async()=>{u(null),d(null);try{const t=await(0,r.t)(e,n,h);d(t),(0,l.lc)({operation:h,setCurlCommand:o,authToken:e,apiEndpoint:n})}catch(t){u(t.message)}},children:"Send the request"}),(0,s.jsx)("div",{style:{marginTop:"10px"}}),p&&(0,s.jsxs)("div",{style:{color:"red"},children:["Error: ",p]}),c&&(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Response:"})," ",(0,s.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(c,null,2)})]}),(0,s.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,s.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to check the balance of your wallets"}),(0,s.jsx)("div",{style:{marginTop:"10px"}}),(0,s.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:t})]})]})}},3450:(e,n,t)=>{t.d(n,{S:()=>o});var a=t(6540),r=t(7077),i=t(9340),l=t(4796),s=t(4848);function o(){const{authToken:e,apiEndpoint:n}=(0,i.A)(),[t,o]=(0,a.useState)(""),[c,d]=(0,a.useState)(null),[p,u]=(0,a.useState)(null),h="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          id\n          walletCurrency\n          balance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,l.lc)({operation:h,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:n,walletCurrency:"USD"})}),[e,n]),(0,s.jsxs)("div",{children:[(0,s.jsx)("button",{onClick:async()=>{u(null),d(null);try{const t=await(0,r.t)(e,n,h);d(t),(0,l.lc)({operation:h,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:n,walletCurrency:"USD"})}catch(t){u(t.message)}},children:"Send the request"}),(0,s.jsx)("div",{style:{marginTop:"10px"}}),p&&(0,s.jsxs)("div",{style:{color:"red"},children:["Error: ",p]}),c&&(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"Response:"})," ",(0,s.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(c,null,2)})]}),(0,s.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,s.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to get the USD wallet ID"}),(0,s.jsx)("div",{style:{marginTop:"10px"}}),(0,s.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:t})]})]})}},9004:(e,n,t)=>{t.d(n,{a:()=>i});t(6540);var a=t(9340),r=t(4848);function i(){const{apiEndpoint:e,setApiEndpoint:n}=(0,a.A)();return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:"The GraphQL endpoint to connect to:"}),(0,r.jsxs)("select",{type:"text",value:e,onChange:e=>{n(e.target.value)},style:{width:"50%",marginBottom:"10px"},children:[(0,r.jsx)("option",{value:"https://api.blink.sv/graphql",children:"Blink (mainnet) - https://api.blink.sv/graphql"}),(0,r.jsx)("option",{value:"https://api.staging.galoy.io/graphql",children:"Staging (signet) - https://api.staging.galoy.io/graphql"})]})]})}},9814:(e,n,t)=>{t.d(n,{K:()=>i});t(6540);var a=t(9340),r=t(4848);function i(){const{setAuthToken:e}=(0,a.A)();return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:"A valid authentication token is required in the header as a bearer token:"}),(0,r.jsx)("input",{type:"text",placeholder:"Paste the authentication token to use it",onChange:n=>{e(n.target.value)},style:{width:"50%",marginBottom:"10px"}})]})}},7077:(e,n,t)=>{t.d(n,{t:()=>a});const a=async function(e,n,t,a){if(void 0===a&&(a={}),!e)throw new Error("Not authenticated");if(!t)throw new Error("No GraphQL query provided");try{const r=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-API-KEY":`${e}`},body:JSON.stringify({query:t,variables:a})});if(!r.ok){const e=await r.text();throw new Error(`Error response from server: ${e}`)}const i=r.headers.get("content-type");if(i&&i.includes("application/json")){return await r.json()}throw new Error(`Unexpected content type: ${i}`)}catch(r){throw console.error("There was an error making the authenticated request:",r),r}}},4796:(e,n,t)=>{t.d(n,{lc:()=>a});function a(e){let{operation:n,type:t="",setCurlCommand:a,authToken:r,apiEndpoint:i,amount:l,paymentRequest:s="",walletId:o="",recipientWalletId:c="",walletCurrency:d="",address:p,lnAddress:u,lnurl:h}=e,g={query:n.trim(),variables:{}};const m=r?`--header 'X-API-KEY: ${r}'`:"--header 'X-API-KEY: <YOUR_AUTH_TOKEN_HERE>'";"invoice"===t?g.variables.input={amount:l.toString(),walletId:o}:"lnInvoiceCreateOnBehalfOfRecipient"===t?g.variables.input={amount:l.toString(),recipientWalletId:c}:"feeProbe"===t||"lnInvoicePaymentSend"===t?g.variables.input={paymentRequest:s,walletId:o}:"onChainTxFee"===t?g.variables={walletId:o,address:p,amount:l}:"onChainSend"===t?g.variables.input={walletId:o,address:p,amount:l}:"lnAddressPaymentSend"===t?g.variables.input={walletId:o,amount:l,lnAddress:u}:"lnurlPaymentSend"===t&&(g.variables.input={walletId:o,amount:l,lnurl:h});let x=JSON.stringify(g).replace(/\n/g,"");a("wallet"===t?`curl -sS --request POST --header 'content-type: application/json' \\\n  ${m} \\\n  --url '${i}' \\\n  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}' \\\n| jq '.data.me.defaultAccount.wallets[] | select(.walletCurrency == "${d}") .id'`:`curl --request POST --header 'content-type: application/json' \\\n  ${m} \\\n  --url '${i}' \\\n  --data '${x}'`)}}}]);