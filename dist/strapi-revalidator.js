"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=["etnry.create","entry.update","entry.delete"],o=async(t,n)=>{if(process.env?.TELEPORTHQ_ISR_TOKEN!==t.query?.TELEPORTHQ_ISR_TOKEN)return;const e=t.body;if(r.includes(e.event)===!1){console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${e.event}`);return}n(e.entry,e.uid)};exports.revalidate=o;
