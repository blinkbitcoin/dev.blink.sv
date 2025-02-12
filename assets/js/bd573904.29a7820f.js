"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[553],{9769:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>v,contentTitle:()=>x,default:()=>w,frontMatter:()=>g,metadata:()=>m,toc:()=>j});var a=t(4848),i=t(8453),r=t(1276),s=t(2108),l=t(230),o=t(2685),c=t(6540),d=t(4325),h=t(2556);function p(){const{authToken:e,apiEndpoint:n,accountWalletId:t,setAccountWalletId:i}=(0,r.A)(),[s,l]=(0,c.useState)(""),[o,p]=(0,c.useState)(null),[u,g]=(0,c.useState)(null),x="mutation onChainAddressCreate($input: OnChainAddressCreateInput!) {\n  onChainAddressCreate(input: $input) {\n    address\n    errors {\n      message\n    }\n  }\n}";(0,c.useEffect)((()=>{(0,h.lc)({operation:x,setCurlCommand:l,authToken:e,apiEndpoint:n,walletId:t})}),[e,n,t]);return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"Set the USD wallet ID:"}),(0,a.jsx)("label",{children:(0,a.jsx)("input",{type:"text",value:t,onChange:e=>{i(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the USD wallet ID from the response above"})})]}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("button",{onClick:async()=>{g(null),p(null);const a={input:{walletId:t}};try{const i=await(0,d.t)(e,n,x,a);p(i),(0,h.lc)({operation:x,setCurlCommand:l,authToken:e,apiEndpoint:n,walletId:t})}catch(i){g(i.message)}},children:"Create a new address"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),u&&(0,a.jsxs)("div",{style:{color:"red"},children:["Error: ",u]}),o&&(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Response:"})," ",(0,a.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(o,null,2)})]}),(0,a.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to generate a new address"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:s})]})]})}var u=t(7146);const g={id:"usd-onchain-receive",title:"Receive USD onchain",slug:"/api/legacy/usd-onchain-receive"},x=void 0,m={id:"api/legacy/usd-onchain-receive",title:"Receive USD onchain",description:"Get the wallet IDs and check the balances",source:"@site/docs/api/legacy/usd-onchain-receive.mdx",sourceDirName:"api/legacy",slug:"/api/legacy/usd-onchain-receive",permalink:"/api/legacy/usd-onchain-receive",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"usd-onchain-receive",title:"Receive USD onchain",slug:"/api/legacy/usd-onchain-receive"}},v={},j=[{value:"Get the wallet IDs and check the balances",id:"get-the-wallet-ids-and-check-the-balances",level:3},{value:"Generate a new address to receive USD",id:"generate-a-new-address-to-receive-usd",level:3},{value:"Once paid check the balance again",id:"once-paid-check-the-balance-again",level:3}];function y(e){const n={a:"a",admonition:"admonition",code:"code",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(r.O,{children:[(0,a.jsx)(s.a,{}),(0,a.jsx)(l.K,{}),(0,a.jsx)(n.h3,{id:"get-the-wallet-ids-and-check-the-balances",children:"Get the wallet IDs and check the balances"}),(0,a.jsxs)(n.p,{children:["Can run this query at any stage to confirm the change in the balances.",(0,a.jsx)("br",{}),'\nThe "BTC" wallet balance is denominated in satoshis.',(0,a.jsx)("br",{}),'\nThe "USD" wallet balance is in cents.']}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        id\n        walletCurrency\n        balance\n      }\n    }\n  }\n}\n"})}),(0,a.jsx)(o.S,{}),(0,a.jsx)(n.hr,{}),(0,a.jsx)(n.h3,{id:"generate-a-new-address-to-receive-usd",children:"Generate a new address to receive USD"}),(0,a.jsxs)(n.p,{children:["Using Stablesats a merchant can generate and onchain address where the bitcoin received will be denominated in USD cents. ",(0,a.jsx)("br",{}),"\nUse the ",(0,a.jsx)(n.code,{children:"address"})," from the response and send to it from any bitcoin wallet.",(0,a.jsx)("br",{}),"\nThe received satoshi amount will reflect the USD/BTC exchange rate at the time it was received and the balance will be kept at the dollar value."]}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"mutation onChainAddressCreate($input: OnChainAddressCreateInput!) {\n  onChainAddressCreate(input: $input) {\n    address\n    errors {\n      message\n    }\n  }\n}\n"})}),(0,a.jsx)(p,{}),(0,a.jsx)(n.hr,{}),(0,a.jsx)(n.h3,{id:"once-paid-check-the-balance-again",children:"Once paid check the balance again"}),(0,a.jsxs)(n.p,{children:["The balance will be updated once the transaction is confirmed on the blockchain.",(0,a.jsx)("br",{}),"\nUntil the confirmation the new incoming amount will show in the ",(0,a.jsx)(n.code,{children:"pendingIncomingBalance"})," field."]}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        walletCurrency\n        balance\n        pendingIncomingBalance\n      }\n    }\n  }\n}\n"})}),(0,a.jsx)(u.c,{})]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["To test the GraphQL requests further use the GraphQL playground at ",(0,a.jsx)(n.a,{href:"https://api.blink.sv/graphql",children:"api.blink.sv/graphql"})," for mainnet or ",(0,a.jsx)(n.a,{href:"https://api.staging.blink.sv/graphql",children:"api.staging.blink.sv/graphql"})," for staging.",(0,a.jsx)("br",{}),"\nCheck out the ",(0,a.jsx)(n.a,{href:"https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ed78e464-9874-4bf7-9b7b-92e5a898db83",children:"Galoy API Postman collection"})," to find examples in multiple programming languages."]})})]})}function w(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(y,{...e})}):y(e)}},1276:(e,n,t)=>{t.d(n,{A:()=>s,O:()=>l});var a=t(6540),i=t(4848);const r=(0,a.createContext)(),s=()=>(0,a.useContext)(r),l=e=>{let{children:n}=e;const[t,s]=(0,a.useState)(null),[l,o]=(0,a.useState)("https://api.blink.sv/graphql"),[c,d]=(0,a.useState)(""),[h,p]=(0,a.useState)(""),u={authToken:t,setAuthToken:s,apiEndpoint:l,setApiEndpoint:o,accountWalletId:c,setAccountWalletId:d,paymentRequest:h,setPaymentRequest:p};return(0,i.jsx)(r.Provider,{value:u,children:n})}},7146:(e,n,t)=>{t.d(n,{c:()=>o});var a=t(6540),i=t(4325),r=t(1276),s=t(2556),l=t(4848);function o(){const{authToken:e,apiEndpoint:n}=(0,r.A)(),[t,o]=(0,a.useState)(""),[c,d]=(0,a.useState)(null),[h,p]=(0,a.useState)(null),u="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          walletCurrency\n          balance\n          pendingIncomingBalance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,s.lc)({operation:u,setCurlCommand:o,authToken:e,apiEndpoint:n})}),[e,n]),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{onClick:async()=>{p(null),d(null);try{const t=await(0,i.t)(e,n,u);d(t),(0,s.lc)({operation:u,setCurlCommand:o,authToken:e,apiEndpoint:n})}catch(t){p(t.message)}},children:"Send the request"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),h&&(0,l.jsxs)("div",{style:{color:"red"},children:["Error: ",h]}),c&&(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:"Response:"})," ",(0,l.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(c,null,2)})]}),(0,l.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,l.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to check the balance of your wallets"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),(0,l.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:t})]})]})}},2685:(e,n,t)=>{t.d(n,{S:()=>o});var a=t(6540),i=t(4325),r=t(1276),s=t(2556),l=t(4848);function o(){const{authToken:e,apiEndpoint:n}=(0,r.A)(),[t,o]=(0,a.useState)(""),[c,d]=(0,a.useState)(null),[h,p]=(0,a.useState)(null),u="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          id\n          walletCurrency\n          balance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,s.lc)({operation:u,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:n,walletCurrency:"USD"})}),[e,n]),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{onClick:async()=>{p(null),d(null);try{const t=await(0,i.t)(e,n,u);d(t),(0,s.lc)({operation:u,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:n,walletCurrency:"USD"})}catch(t){p(t.message)}},children:"Send the request"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),h&&(0,l.jsxs)("div",{style:{color:"red"},children:["Error: ",h]}),c&&(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:"Response:"})," ",(0,l.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(c,null,2)})]}),(0,l.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,l.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to get the USD wallet ID"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),(0,l.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:t})]})]})}},2108:(e,n,t)=>{t.d(n,{a:()=>r});t(6540);var a=t(1276),i=t(4848);function r(){const{apiEndpoint:e,setApiEndpoint:n}=(0,a.A)();return(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:"The GraphQL endpoint to connect to:"}),(0,i.jsxs)("select",{type:"text",value:e,onChange:e=>{n(e.target.value)},style:{width:"50%",marginBottom:"10px"},children:[(0,i.jsx)("option",{value:"https://api.blink.sv/graphql",children:"Blink (mainnet) - https://api.blink.sv/graphql"}),(0,i.jsx)("option",{value:"https://api.staging.blink.sv/graphql",children:"Staging (signet) - https://api.staging.blink.sv/graphql"})]})]})}},230:(e,n,t)=>{t.d(n,{K:()=>r});t(6540);var a=t(1276),i=t(4848);function r(){const{setAuthToken:e}=(0,a.A)();return(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:"A valid authentication token is required in the header as a bearer token:"}),(0,i.jsx)("input",{type:"text",placeholder:"Paste the authentication token to use it",onChange:n=>{e(n.target.value)},style:{width:"50%",marginBottom:"10px"}})]})}},4325:(e,n,t)=>{t.d(n,{t:()=>a});const a=async function(e,n,t,a){if(void 0===a&&(a={}),!e)throw new Error("Not authenticated");if(!t)throw new Error("No GraphQL query provided");try{const i=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`bearer ${e}`},body:JSON.stringify({query:t,variables:a})});if(!i.ok){const e=await i.text();throw new Error(`Error response from server: ${e}`)}const r=i.headers.get("content-type");if(r&&r.includes("application/json")){return await i.json()}throw new Error(`Unexpected content type: ${r}`)}catch(i){throw console.error("There was an error making the authenticated request:",i),i}}},2556:(e,n,t)=>{t.d(n,{Wg:()=>i,ZD:()=>a,cp:()=>r,lc:()=>s});const a=(e,n)=>{const t={email:n};return`curl -X POST '${e}/email/code' \\\n  --header 'Content-Type: application/json' \\\n  --header 'Accept: application/json' \\\n  --data '${JSON.stringify(t)}'`},i=(e,n,t)=>{const a={query:"mutation login($input: UserLoginInput!) { userLogin(input: $input) { authToken } }",variables:{input:{phone:n,code:t}}};return`curl '${e}' \\\n  --header 'Content-Type: application/json' \\\n  --header 'Accept: application/json' \\\n  --data-binary '${JSON.stringify(a)}'`},r=(e,n,t)=>`curl -X POST '${`${e}/email/login`}' \\\n  --header 'Content-Type: application/json' \\\n  --header 'Accept: application/json' \\\n  --data '${JSON.stringify({code:t,emailLoginId:n})}'`;function s(e){let{operation:n,type:t="",setCurlCommand:a,authToken:i,apiEndpoint:r,amount:s,paymentRequest:l="",walletId:o="",walletCurrency:c="",address:d}=e,h={query:n.trim(),variables:{}};const p=i?`--header 'Authorization: Bearer ${i}'`:"--header 'Authorization: Bearer <YOUR_AUTH_TOKEN_HERE>'";"invoice"===t?h.variables.input={amount:s.toString(),walletId:o}:"feeProbe"===t||"lnInvoicePaymentSend"===t?h.variables.input={paymentRequest:l,walletId:o}:"onChainTxFee"===t?h.variables={walletId:o,address:d,amount:s}:"onChainSend"===t&&(h.variables.input={walletId:o,address:d,amount:s});let u=JSON.stringify(h).replace(/\n/g,"");a("wallet"===t?`curl -sS --request POST --header 'content-type: application/json' \\\n  ${p} \\\n  --url '${r}' \\\n  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}' \\\n| jq '.data.me.defaultAccount.wallets[] | select(.walletCurrency == "${c}") .id'`:`curl --request POST --header 'content-type: application/json' \\\n  ${p} \\\n  --url '${r}' \\\n  --data '${u}'`)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>l});var a=t(6540);const i={},r=a.createContext(i);function s(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);