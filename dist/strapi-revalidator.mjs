import i from "node:process";
import { join as l } from "node:path";
import { a as u } from "./utils-87947e30.mjs";
const a = /api::([^.\s]+)/, p = [
  "etnry.create",
  "entry.publish",
  "entry.unpublish",
  "entry.update",
  "entry.delete"
], f = async (t, e) => {
  const n = [];
  if (console.log("[ON-DEMAND_ISR]: Received a request"), i.env?.TELEPORTHQ_ISR_TOKEN !== t.query?.TELEPORTHQ_ISR_TOKEN)
    return n;
  const r = t.body;
  if (p.includes(r.event) === !1)
    return console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${r.event}`), n;
  const c = Object.values(e).filter((o) => {
    const s = d(o.contentType);
    if (s && o.contentType === s)
      return o;
  }).map((o) => y(r.entry, o));
  return n.push(...c), n.filter(Boolean);
}, y = (t, e) => {
  if (!("dynamicRouteAttribute" in e))
    return e.route?.startsWith("/") ? e.route : `/${e.route}`;
  const n = l(e.route, "${" + e.dynamicRouteAttribute + "}");
  return u(n, t);
}, d = (t) => {
  const e = t.match(a);
  return e ? e[1] : null;
};
export {
  f as revalidate
};
