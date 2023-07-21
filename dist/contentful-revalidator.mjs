import { join as i } from "node:path";
import y from "node:process";
const d = ["DeletedEntry", "Entry"], f = async (n, e) => {
  const t = [];
  if (y.env?.TELEPORTHQ_ISR_TOKEN !== n.query?.TELEPORTHQ_ISR_TOKEN)
    return t;
  const s = n.body;
  if (!d.includes(s.sys?.type))
    return console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${s.sys?.type}`), t;
  const o = s.sys?.contentType?.sys?.id, c = Object.values(e).filter((r) => {
    if (r.contentType === o)
      return r;
  }).map((r) => u(s, r));
  return t.push(...c), t;
}, u = (n, e) => {
  if (!("dynamicRouteAttribute" in e))
    return e.route;
  if (e?.dynamicRouteAttribute === "id")
    return i(e.route, n.sys.id);
  const t = n.fields?.[e.dynamicRouteAttribute];
  return t["en-US"] ? i(e.route, t["en-US"]) : i(e.route, Object.keys(t)[0]);
};
export {
  f as revalidate
};
