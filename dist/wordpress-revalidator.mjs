import { join as c } from "node:path";
const p = ["post_update"], u = (o, e) => {
  const t = o.headers, n = [];
  if (console.log(`[ON-DEMAND_ISR]: Received a request ${t["x-wp-webhook-name"]}`), process.env?.TELEPORTHQ_ISR_TOKEN !== o.query?.TELEPORTHQ_ISR_TOKEN)
    return n;
  if (p.includes(t["x-wp-webhook-name"]) === !1)
    return console.log(
      `[ON-DEMAND_ISR]: Received an event that is not allowed: ${t["x-wp-webhook-name"]}`
    ), n;
  const r = o.body, i = Object.values(e).filter((s) => {
    if (s.contentType === r.post.post_type)
      return s;
  }).map((s) => a(r.post, s));
  return n.push(...i), n;
}, a = (o, e) => {
  if (!("dynamicRouteAttribute" in e))
    return e.route?.startsWith("/") ? e.route : `/${e.route}`;
  if (e.dynamicRouteAttribute === "id") {
    const t = c(e.route, "${" + String(o.ID) + "}");
    return t.startsWith("/") ? t : `/${t}`;
  }
};
export {
  u as revalidate
};
