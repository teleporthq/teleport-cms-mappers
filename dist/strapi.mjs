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
      data: a.map(n)
    };
  let t = { ...a };
  return a.attributes && (t = {
    ...t,
    ...s(a.attributes)
  }, delete t.attributes), a.data && (t = r(a.data)), t;
}, n = (a) => ({
  meta: { ...a == null ? void 0 : a.meta, pagination: {
    total: a.meta.pagination.total,
    limit: a.meta.pagination.limit,
    start: a.meta.pagination.start,
    hasNextPage: a.meta.pagination.limit * a.meta.pagination.start < a.meta.pagination.total,
    hasPrevPage: a.meta.pagination.start > 0
  } },
  ...r(a)
});
export {
  n as normalize,
  r as normalizeContent
};
