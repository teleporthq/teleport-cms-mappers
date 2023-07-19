import { join as r } from "node:path";
import T from "node:process";
const f = ["DeletedEntry", "Entry"], a = async (n, e) => {
  const s = n.query, o = n.body, l = o.sys?.type;
  if (!f.includes(l) || T.env?.TELEPORTHQ_ISR_TOKEN !== s?.TELEPORTHQ_ISR_TOKEN)
    return;
  const c = o.sys?.contentType?.sys?.id, i = [], y = Object.values(e).filter(
    (t) => t.contentType === c && t.type === "details"
  )?.[0];
  if (y) {
    const t = u(o, y);
    i.push(t);
  }
  return Object.values(e).filter(
    (t) => t.contentType === c && t.type === "list"
  ).forEach((t) => {
    const d = u(o, t);
    i.push(d);
  }), i;
}, u = (n, e) => {
  if (e?.dynamicRouteAttribute === "id")
    return r(e.route, n.sys.id);
  const s = n.fields?.[e.dynamicRouteAttribute];
  return s["en-US"] ? r(e.route, s["en-US"]) : r(e.route, Object.keys(s)[0]);
};
export {
  a as revalidate
};
