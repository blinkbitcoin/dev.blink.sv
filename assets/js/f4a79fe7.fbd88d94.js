"use strict";(self.webpackChunkdev_blink_sv=self.webpackChunkdev_blink_sv||[]).push([[8412],{4559:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>v,contentTitle:()=>m,default:()=>w,frontMatter:()=>x,metadata:()=>g,toc:()=>j});var a=t(4848),i=t(8453),s=t(9340),r=t(9004),l=t(9814),o=t(3450),c=t(6540),d=t(7077),h=t(4796);function p(){const{authToken:e,apiEndpoint:n,accountWalletId:t,setAccountWalletId:i}=(0,s.A)(),[r,l]=(0,c.useState)(""),[o,p]=(0,c.useState)(null),[u,x]=(0,c.useState)(null),m="mutation onChainAddressCreate($input: OnChainAddressCreateInput!) {\n  onChainAddressCreate(input: $input) {\n    address\n    errors {\n      message\n    }\n  }\n}";(0,c.useEffect)((()=>{(0,h.lc)({operation:m,setCurlCommand:l,authToken:e,apiEndpoint:n,walletId:t})}),[e,n,t]);return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"Set the USD wallet ID:"}),(0,a.jsx)("label",{children:(0,a.jsx)("input",{type:"text",value:t,onChange:e=>{i(e.target.value)},style:{marginLeft:"10px",width:"50%"},placeholder:"Paste the USD wallet ID from the response above"})})]}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("button",{onClick:async()=>{x(null),p(null);const a={input:{walletId:t}};try{const i=await(0,d.t)(e,n,m,a);p(i),(0,h.lc)({operation:m,setCurlCommand:l,authToken:e,apiEndpoint:n,walletId:t})}catch(i){x(i.message)}},children:"Create a new address"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),u&&(0,a.jsxs)("div",{style:{color:"red"},children:["Error: ",u]}),o&&(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Response:"})," ",(0,a.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(o,null,2)})]}),(0,a.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,a.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to generate a new address"}),(0,a.jsx)("div",{style:{marginTop:"10px"}}),(0,a.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:r})]})]})}var u=t(8906);const x={id:"usd-onchain-receive",title:"Receive USD onchain",slug:"/api/usd-onchain-receive"},m=void 0,g={id:"api/usd-onchain-receive",title:"Receive USD onchain",description:"Get the Wallet IDs and Check the Balances",source:"@site/docs/api/usd-onchain-receive.mdx",sourceDirName:"api",slug:"/api/usd-onchain-receive",permalink:"/api/usd-onchain-receive",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"usd-onchain-receive",title:"Receive USD onchain",slug:"/api/usd-onchain-receive"},sidebar:"apiSidebar",previous:{title:"Send BTC onchain",permalink:"/api/btc-onchain-send"},next:{title:"Send USD onchain",permalink:"/api/usd-onchain-send"}},v={},j=[{value:"Get the Wallet IDs and Check the Balances",id:"get-the-wallet-ids-and-check-the-balances",level:3},{value:"Generate a New Address to Receive USD",id:"generate-a-new-address-to-receive-usd",level:3},{value:"Once Paid Check the Balance Again",id:"once-paid-check-the-balance-again",level:3}];function y(e){const n={a:"a",admonition:"admonition",code:"code",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(s.O,{children:[(0,a.jsx)(r.a,{}),(0,a.jsx)(l.K,{}),(0,a.jsx)(n.h3,{id:"get-the-wallet-ids-and-check-the-balances",children:"Get the Wallet IDs and Check the Balances"}),(0,a.jsxs)(n.p,{children:["Can run this query at any stage to confirm the change in the balances.",(0,a.jsx)("br",{}),'\nThe "BTC" wallet balance is denominated in satoshis.',(0,a.jsx)("br",{}),'\nThe "USD" wallet balance is in cents.']}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        id\n        walletCurrency\n        balance\n      }\n    }\n  }\n}\n"})}),(0,a.jsx)(o.S,{}),(0,a.jsx)(n.hr,{}),(0,a.jsx)(n.h3,{id:"generate-a-new-address-to-receive-usd",children:"Generate a New Address to Receive USD"}),(0,a.jsxs)(n.p,{children:["Using Stablesats a merchant can generate and onchain address where the bitcoin received will be denominated in USD cents. ",(0,a.jsx)("br",{}),"\nUse the ",(0,a.jsx)(n.code,{children:"address"})," from the response and send to it from any bitcoin wallet.",(0,a.jsx)("br",{}),"\nThe received satoshi amount will reflect the USD/BTC exchange rate at the time it was received and the balance will be kept at the dollar value."]}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"mutation onChainAddressCreate($input: OnChainAddressCreateInput!) {\n  onChainAddressCreate(input: $input) {\n    address\n    errors {\n      message\n    }\n  }\n}\n"})}),(0,a.jsx)(p,{}),(0,a.jsx)(n.hr,{}),(0,a.jsx)(n.h3,{id:"once-paid-check-the-balance-again",children:"Once Paid Check the Balance Again"}),(0,a.jsxs)(n.p,{children:["The balance will be updated once the transaction is confirmed on the blockchain.",(0,a.jsx)("br",{}),"\nUntil the confirmation the new incoming amount will show in the ",(0,a.jsx)(n.code,{children:"pendingIncomingBalance"})," field."]}),(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["There are multiple ways to get notified on the incoming payments: see ",(0,a.jsx)(n.a,{href:"/api/webhooks",children:"how to use webhooks (callbacks)"})," and ",(0,a.jsx)(n.a,{href:"/api/websocket",children:"websocket subscriptions"}),"."]})}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The body of the GraphQL request to check the balance including pendingIncomingBalance"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-graphql",children:"query Me {\n  me {\n    defaultAccount {\n      wallets {\n        walletCurrency\n        balance\n        pendingIncomingBalance\n      }\n    }\n  }\n}\n"})}),(0,a.jsx)(u.c,{})]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["To test the GraphQL requests further use the GraphQL playground at ",(0,a.jsx)(n.a,{href:"https://api.blink.sv/graphql",children:"api.blink.sv/graphql"})," for mainnet or ",(0,a.jsx)(n.a,{href:"https://api.staging.blink.sv/graphql",children:"api.staging.blink.sv/graphql"})," for staging.",(0,a.jsx)("br",{}),"\nCheck out the ",(0,a.jsx)(n.a,{href:"https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#ed78e464-9874-4bf7-9b7b-92e5a898db83",children:"Galoy API Postman collection"})," to find examples in multiple programming languages."]})})]})}function w(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(y,{...e})}):y(e)}},9340:(e,n,t)=>{t.d(n,{A:()=>r,O:()=>l});var a=t(6540),i=t(4848);const s=(0,a.createContext)(),r=()=>(0,a.useContext)(s),l=e=>{let{children:n}=e;const[t,r]=(0,a.useState)(null),[l,o]=(0,a.useState)("https://api.blink.sv/graphql"),[c,d]=(0,a.useState)(""),[h,p]=(0,a.useState)(""),[u,x]=(0,a.useState)(""),[m,g]=(0,a.useState)(""),[v,j]=(0,a.useState)(""),y={authToken:t,setAuthToken:r,apiEndpoint:l,setApiEndpoint:o,accountWalletId:c,setAccountWalletId:d,paymentRequest:h,setPaymentRequest:p,lnAddress:u,setLnAddress:x,lnurl:m,setLnurl:g,amount:v,setAmount:j};return(0,i.jsx)(s.Provider,{value:y,children:n})}},8906:(e,n,t)=>{t.d(n,{c:()=>o});var a=t(6540),i=t(7077),s=t(9340),r=t(4796),l=t(4848);function o(){const{authToken:e,apiEndpoint:n}=(0,s.A)(),[t,o]=(0,a.useState)(""),[c,d]=(0,a.useState)(null),[h,p]=(0,a.useState)(null),u="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          walletCurrency\n          balance\n          pendingIncomingBalance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,r.lc)({operation:u,setCurlCommand:o,authToken:e,apiEndpoint:n})}),[e,n]),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{onClick:async()=>{p(null),d(null);try{const t=await(0,i.t)(e,n,u);d(t),(0,r.lc)({operation:u,setCurlCommand:o,authToken:e,apiEndpoint:n})}catch(t){p(t.message)}},children:"Send the request"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),h&&(0,l.jsxs)("div",{style:{color:"red"},children:["Error: ",h]}),c&&(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:"Response:"})," ",(0,l.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(c,null,2)})]}),(0,l.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,l.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to check the balance of your wallets"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),(0,l.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:t})]})]})}},3450:(e,n,t)=>{t.d(n,{S:()=>o});var a=t(6540),i=t(7077),s=t(9340),r=t(4796),l=t(4848);function o(){const{authToken:e,apiEndpoint:n}=(0,s.A)(),[t,o]=(0,a.useState)(""),[c,d]=(0,a.useState)(null),[h,p]=(0,a.useState)(null),u="  query Me {\n    me {\n      defaultAccount {\n        wallets {\n          id\n          walletCurrency\n          balance\n        }\n      }\n    }\n  }";return(0,a.useEffect)((()=>{(0,r.lc)({operation:u,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:n,walletCurrency:"USD"})}),[e,n]),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{onClick:async()=>{p(null),d(null);try{const t=await(0,i.t)(e,n,u);d(t),(0,r.lc)({operation:u,type:"wallet",setCurlCommand:o,authToken:e,apiEndpoint:n,walletCurrency:"USD"})}catch(t){p(t.message)}},children:"Send the request"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),h&&(0,l.jsxs)("div",{style:{color:"red"},children:["Error: ",h]}),c&&(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:"Response:"})," ",(0,l.jsx)("pre",{style:{marginLeft:"10px"},children:JSON.stringify(c,null,2)})]}),(0,l.jsxs)("div",{style:{marginTop:"20px",marginBottom:"40px"},children:[(0,l.jsx)("div",{style:{fontWeight:"bold"},children:"curl command to get the USD wallet ID"}),(0,l.jsx)("div",{style:{marginTop:"10px"}}),(0,l.jsx)("pre",{style:{backgroundColor:"auto",padding:"10px",marginLeft:"10px",overflowX:"auto",whiteSpace:"pre-wrap"},children:t})]})]})}},9004:(e,n,t)=>{t.d(n,{a:()=>s});t(6540);var a=t(9340),i=t(4848);function s(){const{apiEndpoint:e,setApiEndpoint:n}=(0,a.A)();return(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:"The GraphQL endpoint to connect to:"}),(0,i.jsxs)("select",{type:"text",value:e,onChange:e=>{n(e.target.value)},style:{width:"50%",marginBottom:"10px"},children:[(0,i.jsx)("option",{value:"https://api.blink.sv/graphql",children:"Blink (mainnet) - https://api.blink.sv/graphql"}),(0,i.jsx)("option",{value:"https://api.staging.blink.sv/graphql",children:"Staging (signet) - https://api.staging.blink.sv/graphql"})]})]})}},9814:(e,n,t)=>{t.d(n,{K:()=>s});t(6540);var a=t(9340),i=t(4848);function s(){const{setAuthToken:e}=(0,a.A)();return(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:"A valid authentication token is required in the header as a bearer token:"}),(0,i.jsx)("input",{type:"text",placeholder:"Paste the authentication token to use it",onChange:n=>{e(n.target.value)},style:{width:"50%",marginBottom:"10px"}})]})}},7077:(e,n,t)=>{t.d(n,{t:()=>a});const a=async function(e,n,t,a){if(void 0===a&&(a={}),!e)throw new Error("Not authenticated");if(!t)throw new Error("No GraphQL query provided");try{const i=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-API-KEY":`${e}`},body:JSON.stringify({query:t,variables:a})});if(!i.ok){const e=await i.text();throw new Error(`Error response from server: ${e}`)}const s=i.headers.get("content-type");if(s&&s.includes("application/json")){return await i.json()}throw new Error(`Unexpected content type: ${s}`)}catch(i){throw console.error("There was an error making the authenticated request:",i),i}}},4796:(e,n,t)=>{t.d(n,{lc:()=>a});function a(e){let{operation:n,type:t="",setCurlCommand:a,authToken:i,apiEndpoint:s,amount:r,paymentRequest:l="",walletId:o="",recipientWalletId:c="",walletCurrency:d="",address:h,lnAddress:p,lnurl:u}=e,x={query:n.trim(),variables:{}};const m=i?`--header 'X-API-KEY: ${i}'`:"--header 'X-API-KEY: <YOUR_AUTH_TOKEN_HERE>'";"invoice"===t?x.variables.input={amount:r.toString(),walletId:o}:"lnInvoiceCreateOnBehalfOfRecipient"===t?x.variables.input={amount:r.toString(),recipientWalletId:c}:"feeProbe"===t||"lnInvoicePaymentSend"===t?x.variables.input={paymentRequest:l,walletId:o}:"onChainTxFee"===t?x.variables={walletId:o,address:h,amount:r}:"onChainSend"===t?x.variables.input={walletId:o,address:h,amount:r}:"lnAddressPaymentSend"===t?x.variables.input={walletId:o,amount:r,lnAddress:p}:"lnurlPaymentSend"===t&&(x.variables.input={walletId:o,amount:r,lnurl:u});let g=JSON.stringify(x).replace(/\n/g,"");a("wallet"===t?`curl -sS --request POST --header 'content-type: application/json' \\\n  ${m} \\\n  --url '${s}' \\\n  --data '{"query":"query me { me { defaultAccount { wallets { id walletCurrency }}}}", "variables":{}}' \\\n| jq '.data.me.defaultAccount.wallets[] | select(.walletCurrency == "${d}") .id'`:`curl --request POST --header 'content-type: application/json' \\\n  ${m} \\\n  --url '${s}' \\\n  --data '${g}'`)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>l});var a=t(6540);const i={},s=a.createContext(i);function r(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);