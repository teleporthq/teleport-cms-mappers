function l(a) {
  if (typeof a != "object" || a === null)
    return a;
  const t = {};
  for (const i in a)
    t[i] = l(a[i]);
  return t;
}
const s = (a) => {
  const t = {};
  for (const i in a) {
    const e = a[i];
    if (typeof e == "object" && e !== null && "data" in e && e.data !== null && "id" in e.data && "attributes" in e.data) {
      const o = r(e);
      t[i] = { id: e.data.id, ...o };
    } else
      t[i] = l(e);
  }
  return t;
}, r = (a) => {
  if (a == null || typeof a == "object" && !Object.keys(a).length)
    return null;
  if (Array.isArray(a))
    return {
      data: a.map(d)
    };
  let t = { ...a };
  return a.attributes && (t = {
    ...t,
    ...s(a.attributes)
  }, delete t.attributes), a.data && (t = r(a.data)), t;
}, d = (a) => ({
  meta: {
    ...a == null ? void 0 : a.meta,
    pagination: {
      total: a.meta.pagination.total,
      limit: a.meta.pagination.limit,
      start: a.meta.pagination.start,
      pages: Math.ceil(a.meta.total / a.meta.limit)
    }
  },
  ...r(a)
});
export {
  d as normalize,
  r as normalizeContent
};
