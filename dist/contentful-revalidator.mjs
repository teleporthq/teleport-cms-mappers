import { revalidatePath as d } from "next/cache";
import { join as p } from "node:path";
import u from "node:process";
const E = ["DeletedEntry", "Entry"], m = async (o, e) => {
  const y = o.query, s = o.body, l = s.sys?.type;
  if (!E.includes(l) || u.env?.TELEPORTHQ_ISR_TOKEN !== y?.TELEPORTHQ_ISR_TOKEN)
    return;
  const c = s.sys?.contentType?.sys?.id, i = Object.values(e).filter(
    (t) => t.contentType === c && t.type === "details"
  )?.[0], n = [];
  if (i) {
    const t = r(s, i);
    n.push(t);
  }
  Object.values(e).filter(
    (t) => t.contentType === c && t.type === "list"
  ).forEach((t) => {
    const a = r(s, t);
    n.push(a);
  }), n.forEach((t) => {
    console.log(`[ON-DEMAND_ISR]: Clearing cahce for path - ${t} `), d(t);
  });
}, r = (o, e) => e?.dynamicRouteAttribute ? p(
  e.route,
  e.dynamicRouteAttribute === "id" ? o.sys.id : o.fields.slug["en-US"]
) : e.route;
export {
  m as revalidate
};
