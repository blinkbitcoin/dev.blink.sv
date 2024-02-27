"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[2],{1236:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>y,contentTitle:()=>x,default:()=>f,frontMatter:()=>m,metadata:()=>g,toc:()=>j});var a=n(4848),r=n(5680),i=n(9340),s=n(9004),l=n(9814),o=n(8383),d=n(6540),c=n(7077),u=n(4796);function p(){const{authToken:e,apiEndpoint:t,accountWalletId:n,setAccountWalletId:r}=(0,i.A)(),[s,l]=(0,d.useState)(),[o,p]=(0,d.useState)(546),[h,m]=(0,d.useState)(""),[x,g]=(0,d.useState)(null),[y,j]=(0,d.useState)(null),v="query onChainTxFee($walletId: WalletId!, $address: OnChainAddress!, $amount: SatAmount!) {\n  onChainTxFee(walletId: $walletId, address: $address, amount: $amount) {\n    amount\n  }\n}";(0,d.useEffect)((()=>{(0,u.lc)({operation:v,type:"onChainTxFee",setCurlCommand:m,authToken:e,apiEndpoint:t,walletId:n,address:s,amount:o})}),[e,t,n,o,s]);return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"Set the variables"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("div",{children:(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"Amount (sats):"}),(0,a.jsx)("input",{type:"number",value:o,onChange:e=>{p(e.target.value)},style:{marginLeft:"10px",width:"50%"}})]})}),(0,a.jsx)("div",{children:(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"Onchain address:"}),(0,a.jsx)("input",{type:"text",value:s,onChange:e=>{l(e.target.value)},style:{marginLeft:"10px",width:"50%"}})]})}),(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"BTC wallet ID:"}),(0,a.jsx)("input",{type:"text",value:n,onChange:e=>{r(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the BTC wallet ID from the response above"})]})]}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("button",{onClick:async()=>{j(null),g(null);const a={walletId:n,address:s,amount:o};try{const r=await(0,c.t)(e,t,v,a);g(r),(0,u.lc)({operation:v,type:"onChainTxFee",setCurlCommand:m,authToken:e,apiEndpoint:t,walletId:n,address:s,amount:o})}catch(r){j(r.message)}},children:"Estimate the transaction fee"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),y&&(0,a.jsxs)("div",{style:{color:"red"},children:["Error: ",y]}),x&&(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Response:"})," ",(0,a.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(x,null,2)})]}),(0,a.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to estimate the transaction fee"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:h})]})]})}function h(){const{authToken:e,apiEndpoint:t,accountWalletId:n,setAccountWalletId:r}=(0,i.A)(),[s,l]=(0,d.useState)(),[o,p]=(0,d.useState)(546),[h,m]=(0,d.useState)(""),[x,g]=(0,d.useState)(null),[y,j]=(0,d.useState)(null),v="mutation onChainPaymentSend($input: OnChainPaymentSendInput!) {\n  onChainPaymentSend(input: $input) {\n    errors {\n      message\n    }\n    status\n  }\n}";(0,d.useEffect)((()=>{(0,u.lc)({operation:v,type:"onChainSend",setCurlCommand:m,authToken:e,apiEndpoint:t,walletId:n,address:s,amount:o})}),[e,t,n,o,s]);return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"Set the variables"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("div",{children:(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"Amount (sats):"}),(0,a.jsx)("input",{type:"number",value:o,onChange:e=>{p(e.target.value)},style:{marginLeft:"10px",width:"50%"}})]})}),(0,a.jsx)("div",{children:(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"Onchain address:"}),(0,a.jsx)("input",{type:"text",value:s,onChange:e=>{l(e.target.value)},style:{marginLeft:"10px",width:"50%"}})]})}),(0,a.jsxs)("label",{children:[(0,a.jsx)("div",{children:"BTC wallet ID:"}),(0,a.jsx)("input",{type:"text",value:n,onChange:e=>{r(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the BTC wallet ID from the response above"})]})]}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("button",{onClick:async()=>{j(null),g(null);const a={input:{walletId:n,address:s,amount:o}};try{const r=await(0,c.t)(e,t,v,a);g(r),(0,u.lc)({operation:v,type:"onChainSend",setCurlCommand:m,authToken:e,apiEndpoint:t,walletId:n,address:s,amount:o})}catch(r){j(r.message)}},children:"Send the transaction"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),y&&(0,a.jsxs)("div",{style:{color:"red"},children:["Error: ",y]}),x&&(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Response:"})," ",(0,a.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(x,null,2)})]}),(0,a.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to send the transaction"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:h})]})]})}const m={id:"btc-onchain-send",title:"Send BTC onchain",slug:"/api/btc-onchain-send"},x=void 0,g={id:"api/btc-onchain-send",title:"Send BTC onchain",description:"Get the wallet IDs and check the balances",source:"@site/docs/api/btc-onchain-send.mdx",sourceDirName:"api",slug:"/api/btc-onchain-send",permalink:"/api/btc-onchain-send",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"btc-onchain-send",title:"Send BTC onchain",slug:"/api/btc-onchain-send"},sidebar:"apiSidebar",previous:{title:"Receive BTC onchain",permalink:"/api/btc-onchain-receive"},next:{title:"Receive USD onchain",permalink:"/api/usd-onchain-receive"}},y={},j=[{value:"Get the wallet IDs and check the balances",id:"get-the-wallet-ids-and-check-the-balances",level:3},{value:"Estimate",id:"estimate",level:3},{value:"Send a transaction",id:"send-a-transaction",level:3}];function v(e){const t={a:"a",admonition:"admonition",code:"code",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,r.RP)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i.O,{children:[(0,a.jsx)(s.a,{}),(0,a.jsx)(l.K,{}),(0,a.jsx)(t.h3,{id:"get-the-wallet-ids-and-check-the-balances",children:"Get the wallet IDs and check the balances"}),(0,a.jsxs)(t.p,{children:["Can run this query at any stage to confirm the change in the balances.",(0,a.jsx)("br",{}),'\nThe "BTC" wallet balance is denominated in satoshis.',(0,a.jsx)("br",{}),'\nThe "USD" wallet balance is in cents.']}),(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-graphql",children:"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        id\n        walletCurrency\n        balance\n      }\n    }\n  }\n}\n"})}),(0,a.jsx)(o.z,{}),(0,a.jsx)(t.hr,{}),(0,a.jsx)(t.h3,{id:"estimate",children:"Estimate"}),(0,a.jsx)(t.p,{children:"Estimate how many satoshis the transaction will cost."}),(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-graphql",children:"query onChainTxFee($walletId: WalletId!, $address: OnChainAddress!, $amount: SatAmount!) {\n  onChainTxFee(walletId: $walletId, address: $address, amount: $amount) {\n    amount\n  }\n}\n"})}),(0,a.jsx)(p,{}),(0,a.jsx)(t.hr,{}),(0,a.jsx)(t.h3,{id:"send-a-transaction",children:"Send a transaction"}),(0,a.jsx)(t.p,{children:"Send a transaction onchain from your BTC account."}),(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-graphql",children:"mutation onChainPaymentSend($input: OnChainPaymentSendInput!) {\n  onChainPaymentSend(input: $input) {\n    errors {\n      message\n    }\n    status\n  }\n}\n"})}),(0,a.jsx)(h,{})]}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsxs)(t.p,{children:["To test the GraphQL requests further use the GraphQL playground at ",(0,a.jsx)(t.a,{href:"https://api.blink.sv/graphql",children:"api.blink.sv/graphql"})," for mainnet or ",(0,a.jsx)(t.a,{href:"https://api.staging.galoy.io/graphql",children:"api.staging.galoy.io/graphql"})," for staging.",(0,a.jsx)("br",{}),"\nCheck out the ",(0,a.jsx)(t.a,{href:"https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ac3751d8-c116-408b-9129-d6e365da590b",children:"Galoy API Postman collection"})," to find examples in multiple programming languages."]})})]})}function f(e={}){const{wrapper:t}={...(0,r.RP)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(v,{...e})}):v(e)}},5680:(e,t,n)=>{n.d(t,{RP:()=>d});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),d=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=d(n),h=r,m=p["".concat(o,".").concat(h)]||p[h]||c[h]||i;return n?a.createElement(m,s(s({ref:t},u),{},{components:n})):a.createElement(m,s({ref:t},u))}));u.displayName="MDXCreateElement"},9340:(e,t,n)=>{n.d(t,{A:()=>s,O:()=>l});var a=n(6540),r=n(4848);const i=(0,a.createContext)(),s=()=>(0,a.useContext)(i),l=e=>{let{children:t}=e;const[n,s]=(0,a.useState)(null),[l,o]=(0,a.useState)("https://api.blink.sv/graphql"),[d,c]=(0,a.useState)(""),[u,p]=(0,a.useState)(""),[h,m]=(0,a.useState)(""),[x,g]=(0,a.useState)(""),[y,j]=(0,a.useState)(""),v={authToken:n,setAuthToken:s,apiEndpoint:l,setApiEndpoint:o,accountWalletId:d,setAccountWalletId:c,paymentRequest:u,setPaymentRequest:p,lnAddress:h,setLnAddress:m,lnurl:x,setLnurl:g,amount:y,setAmount:j};return(0,r.jsx)(i.Provider,{value:v,children:t})}},8383:(e,t,n)=>{n.d(t,{z:()=>o});var a=n(6540),r=n(7077),i=n(9340),s=n(4796),l=n(4848);function o(){const{authToken:e,apiEndpoint:t}=(0,i.A)(),[n,o]=(0,a.useState)(""),[d,c]=(0,a.useState)(null),[u,p]=(0,a.useState)(null),h="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          id\n          walletCurrency\n          balance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,s.lc)({operation:h,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:t,walletCurrency:"BTC"})}),[e,t]),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{onClick:async()=>{p(null),c(null);try{const n=await(0,r.t)(e,t,h);c(n),(0,s.lc)({operation:h,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:t,walletCurrency:"BTC"})}catch(n){p(n.message)}},children:"Send the request"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),u&&(0,l.jsxs)("div",{style:{color:"red"},children:["Error: ",u]}),d&&(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:"Response:"})," ",(0,l.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(d,null,2)})]}),(0,l.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,l.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to get the BTC wallet ID"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),(0,l.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:n})]})]})}},9004:(e,t,n)=>{n.d(t,{a:()=>i});n(6540);var a=n(9340),r=n(4848);function i(){const{apiEndpoint:e,setApiEndpoint:t}=(0,a.A)();return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:"The GraphQL endpoint to connect to:"}),(0,r.jsxs)("select",{type:"text",value:e,onChange:e=>{t(e.target.value)},style:{width:"50%",marginBottom:"10px"},children:[(0,r.jsx)("option",{value:"https://api.blink.sv/graphql",children:"Blink (mainnet) - https://api.blink.sv/graphql"}),(0,r.jsx)("option",{value:"https://api.staging.galoy.io/graphql",children:"Staging (signet) - https://api.staging.galoy.io/graphql"})]})]})}},9814:(e,t,n)=>{n.d(t,{K:()=>i});n(6540);var a=n(9340),r=n(4848);function i(){const{setAuthToken:e}=(0,a.A)();return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:"A valid authentication token is required in the header as a bearer token:"}),(0,r.jsx)("input",{type:"text",placeholder:"Paste the authentication token to use it",onChange:t=>{e(t.target.value)},style:{width:"50%",marginBottom:"10px"}})]})}},7077:(e,t,n)=>{n.d(t,{t:()=>a});const a=async function(e,t,n,a){if(void 0===a&&(a={}),!e)throw new Error("Not authenticated");if(!n)throw new Error("No GraphQL query provided");try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-API-KEY":`${e}`},body:JSON.stringify({query:n,variables:a})});if(!r.ok){const e=await r.text();throw new Error(`Error response from server: ${e}`)}const i=r.headers.get("content-type");if(i&&i.includes("application/json")){return await r.json()}throw new Error(`Unexpected content type: ${i}`)}catch(r){throw console.error("There was an error making the authenticated request:",r),r}}},4796:(e,t,n)=>{n.d(t,{lc:()=>a});function a(e){let{operation:t,type:n="",setCurlCommand:a,authToken:r,apiEndpoint:i,amount:s,paymentRequest:l="",walletId:o="",recipientWalletId:d="",walletCurrency:c="",address:u,lnAddress:p,lnurl:h}=e,m={query:t.trim(),variables:{}};const x=r?`--header 'X-API-KEY: ${r}'`:"--header 'X-API-KEY: <YOUR_AUTH_TOKEN_HERE>'";"invoice"===n?m.variables.input={amount:s.toString(),walletId:o}:"lnInvoiceCreateOnBehalfOfRecipient"===n?m.variables.input={amount:s.toString(),recipientWalletId:d}:"feeProbe"===n||"lnInvoicePaymentSend"===n?m.variables.input={paymentRequest:l,walletId:o}:"onChainTxFee"===n?m.variables={walletId:o,address:u,amount:s}:"onChainSend"===n?m.variables.input={walletId:o,address:u,amount:s}:"lnAddressPaymentSend"===n?m.variables.input={walletId:o,amount:s,lnAddress:p}:"lnurlPaymentSend"===n&&(m.variables.input={walletId:o,amount:s,lnurl:h});let g=JSON.stringify(m).replace(/\n/g,"");a("wallet"===n?`curl -sS --request POST --header 'content-type: application/json' \\\n  ${x} \\\n  --url '${i}' \\\n  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}' \\\n| jq '.data.me.defaultAccount.wallets[] | select(.walletCurrency == "${c}") .id'`:`curl --request POST --header 'content-type: application/json' \\\n  ${x} \\\n  --url '${i}' \\\n  --data '${g}'`)}}}]);