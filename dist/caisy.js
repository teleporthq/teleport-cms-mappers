"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const d=(e,t)=>{let r=t?parseInt(t):1;(!r||isNaN(r))&&(r=1);const s=e.pageInfo?.hasNextPage??!1,n=e.pageInfo?.hasPreviousPage??!1,a=e.edges.map(o=>o.node);return{meta:{pagination:{total:a.length,hasNextPage:s,hasPrevPage:n,page:r}},data:c(a)}},m=e=>{if(!e.data||!Object.keys(e.data).length)return{meta:{pagination:{}},data:[]};let t=e.data[Object.keys(e.data)[0]];return t?.edges&&(t=t.edges.map(r=>r.node)?.[0]),{meta:{pagination:{}},data:[c(t)]}},c=e=>Array.isArray(e)&&!e.length?[]:e==null?e:typeof e=="object"&&!Object.keys(e).length?{}:Array.isArray(e)?e.map(t=>c(t)):Object.keys(e._meta||{})?.length?{...c(u(e))}:typeof e=="object"&&e.json&&e.json.type==="doc"?S(e):Object.keys(e).reduce((t,r)=>{const s=e[r];return s==null?(t[r]=s,t):Array.isArray(s)?(t[r]=s.map(n=>c(n)),t):typeof s=="object"?(t[r]={...c(u(s))},t):(t[r]=s,t)},{}),u=e=>{let t=e;return t?._meta&&(t={...t,...t._meta},delete t._meta),t?.__typename==="Asset"&&(t={...t,...h(t)}),t},h=e=>({id:e.id,name:e.title,alt:e.keywords,url:e.src,assetType:e.originType,size:{height:e.height,width:e.width}}),S=e=>e.connections?!e.json||typeof e.json=="string"?"":{content:e.json.content.map(r=>{if(r.type!=="documentLink"||!e.connections)return r;const s=e.connections.find(n=>n?.__typename=="Asset"&&n.id===r.attrs.documentId);return s&&(r.attrs={...r.attrs,src:s.src,title:s.title}),r}),type:e.json.type}:e.json,g=e=>`https://cloud.caisy.io/api/v3/e/${e}/graphql`,l=async e=>{if(e.status===401||e.status===403)throw new Error(`Caisy auth or permission issue: ${e.statusText}`);if(e.status!==200)throw new Error(`Internal error fetching entries from Caisy: ${e.statusText}`);const t=await e.json();if(t.errors)throw new Error(`getEntitiesByPage from caisy - internal error fetching entries from caisy: ${JSON.stringify(t.errors)}`);return t},w=async e=>{const{projectId:t,query:r}=e,s=g(t),n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","x-caisy-token":process.env.CMS_ACCESS_TOKEN},body:JSON.stringify({query:r})}),a=await l(n);return d(a.data[Object.keys(a.data)[0]])},A=async e=>{const{projectId:t,query:r,attribute:s}=e,n=g(t);try{const a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-caisy-token":process.env.CMS_ACCESS_TOKEN},body:JSON.stringify({query:r,variables:{value:e?.[`${s}`]??""}})}),o=await l(a);return m(o)}catch(a){throw new Error(a.message)}},j=async e=>{const{projectId:t,query:r,perPage:s,after:n="",page:a,...o}=e,b=g(t),i=Number.parseInt(e.page??"1"),f=Number.parseInt(e.perPage??"10"),p=n?f:(i>1?i-1:i)*f,P=await fetch(b,{method:"POST",headers:{"Content-Type":"application/json","x-caisy-token":process.env.CMS_ACCESS_TOKEN},body:JSON.stringify({query:r,variables:{first:p,after:n,...o}})}),y=await l(P);if(!y.data)return[];const{endCursor:C,hasNextPage:O}=y.data[Object.keys(y.data)[0]].pageInfo;return i===1||!O||n?d(y.data[Object.keys(y.data)[0]],i.toString()):await j({projectId:t,query:r,perPage:s,...o,page:i.toString(),after:C})};exports.getEntities=w;exports.getEntitiesWithPagination=j;exports.getEntityByAttribute=A;exports.normalizeCaisyAssetData=h;exports.normalizeCaisyItemContent=m;exports.normalizeCaisyListContent=d;
