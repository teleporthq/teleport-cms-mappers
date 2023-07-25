import { join as s } from "node:path";
import y from "node:process";
import { r as u } from "./utils-87947e30.mjs";
const l = ["DeletedEntry", "Entry"], m = async (e, t) => {
  const n = [];
  if (y.env?.TELEPORTHQ_ISR_TOKEN !== e.query?.TELEPORTHQ_ISR_TOKEN)
    return n;
  const r = e.body;
  if (!l.includes(r.sys?.type))
    return console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${r.sys?.type}`), n;
  const i = r.sys?.contentType?.sys?.id, c = Object.values(t).filter((o) => {
    if (o.contentType === i)
      return o;
  }).map((o) => p(r, o));
  return n.push(...c), n;
}, p = (e, t) => "dynamicRouteAttribute" in t ? t?.dynamicRouteAttribute === "id" ? s(t.route, "${" + e.sys.id + "}") : u(
  s(t.route, "${" + t.dynamicRouteAttribute + "}"),
  e
) : t.route;
export {
  m as revalidate
};
