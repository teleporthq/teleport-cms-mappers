function o(t) {
  if (typeof t != "object" || t === null)
    return t;
  const e = {};
  for (const r in t)
    e[r] = o(t[r]);
  return e;
}
const n = (t) => {
  const e = {};
  for (const r in t) {
    const a = t[r];
    if (typeof a == "object" && a !== null && "data" in a && a.data !== null && "id" in a.data && "attributes" in a.data) {
      const i = l(a);
      e[r] = { id: a.data.id, ...i };
    } else
      e[r] = o(a);
  }
  return e;
}, l = (t) => {
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  if (Array.isArray(t))
    return {
      data: t.map(s)
    };
  let e = { ...t };
  return t.attributes && (e = {
    ...e,
    ...n(t.attributes)
  }, delete e.attributes), t.data && (e = l(t.data)), e;
}, s = (t) => ({
  meta: (t == null ? void 0 : t.meta) || {},
  ...l(t)
});
export {
  s as normalize,
  l as normalizeContent
};
