import { join as d } from "node:path";
import p from "node:process";
const T = ["DeletedEntry", "Entry"], O = async (s, e) => {
  const y = s.query, n = s.body, l = n.sys?.type;
  if (!T.includes(l) || p.env?.TELEPORTHQ_ISR_TOKEN !== y?.TELEPORTHQ_ISR_TOKEN)
    return;
  const i = n.sys?.contentType?.sys?.id, o = [], c = Object.values(e).filter(
    (t) => t.contentType === i && t.type === "details"
  )?.[0];
  if (c) {
    const t = r(n, c);
    o.push(t);
  }
  return Object.values(e).filter(
    (t) => t.contentType === i && t.type === "list"
  ).forEach((t) => {
    const u = r(n, t);
    o.push(u);
  }), o;
}, r = (s, e) => e?.dynamicRouteAttribute ? d(
  e.route,
  e.dynamicRouteAttribute === "id" ? s.sys.id : s.fields.slug["en-US"]
) : e.route;
export {
  O as revalidate
};
