"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=["etnry.create","entry.update","entry.delete","entry.publish","entry.unpublish"],l=async(t,n)=>{const e=t.body;if(r.includes(e.event)===!1){console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${e.event}`);return}n(e.entry,e.uid)};exports.revalidate=l;
