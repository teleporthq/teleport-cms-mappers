import i from "node:process";
import { join as l } from "node:path";
const u = /api::([^.\s]+)/, a = [
  "etnry.create",
  "entry.publish",
  "entry.unpublish",
  "entry.update",
  "entry.delete"
], T = async (n, e) => {
  const o = [];
  if (console.log("[ON-DEMAND_ISR]: Received a request"), i.env?.TELEPORTHQ_ISR_TOKEN !== n.query?.TELEPORTHQ_ISR_TOKEN)
    return o;
  const t = n.body;
  if (a.includes(t.event) === !1)
    return console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${t.event}`), o;
  const c = Object.values(e).filter((r) => {
    const s = y(r.contentType);
    if (s && r.contentType === s)
      return r;
  }).map((r) => p(t.entry, r));
  return o.push(...c), o.filter(Boolean);
}, p = (n, e) => {
  if (!("dynamicRouteAttribute" in e))
    return e.route?.startsWith("/") ? e.route : `/${e.route}`;
  const o = n[e.dynamicRouteAttribute], t = l(e.route, String(o));
  return t.startsWith("/") ? t : `/${t}`;
}, y = (n) => {
  const e = n.match(u);
  return e ? e[1] : null;
};
export {
  T as revalidate
};
