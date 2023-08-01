const r = ["post_update"], d = async (o, t) => {
  const e = o.headers;
  if (console.log(`[ON-DEMAND_ISR]: Received a request ${e["x-wp-webhook-name"]}`), r.includes(e["x-wp-webhook-name"]) === !1) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not allowed: ${e["x-wp-webhook-name"]}`
    );
    return;
  }
  const n = o.body, s = n.post.post_type, c = {
    id: n.post_id,
    ...a(n.post)
  };
  t(c, s);
}, a = (o) => Object.keys(o).reduce((t, e) => {
  const n = e.replace(/^post_/, ""), s = o[e];
  return typeof s == "object" ? (t[n] = a(s), t) : (t[n] = o[e], t);
}, {});
export {
  d as revalidate
};
