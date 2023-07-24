function P(a) {
  if (typeof a != "object" || a === null)
    return a;
  const i = {};
  for (const l in a)
    i[l] = P(a[l]);
  return i;
}
const k = (a) => {
  const i = {};
  for (const l in a) {
    const r = a[l];
    if (typeof r == "object" && r !== null && "data" in r && r.data !== null && "id" in r.data && "attributes" in r.data) {
      const s = m(r);
      i[l] = { id: r.data.id, ...s };
    } else
      i[l] = P(r);
  }
  return i;
}, m = (a) => {
  if (a == null || typeof a == "object" && !Object.keys(a).length)
    return null;
  if (Array.isArray(a))
    return {
      data: a.map(v)
    };
  let i = { ...a };
  return a.attributes && (i = {
    ...i,
    ...k(a.attributes)
  }, delete i.attributes), a.data && (i = m(a.data)), i;
}, v = (a) => {
  var s, e, d, g, f, u, t, p, y, b, h, z;
  let i;
  (e = (s = a == null ? void 0 : a.meta) == null ? void 0 : s.pagination) != null && e.total && ((g = (d = a == null ? void 0 : a.meta) == null ? void 0 : d.pagination) != null && g.limit) && (i = Math.ceil(a.meta.pagination.total / a.meta.pagination.limit));
  const l = ((u = (f = a == null ? void 0 : a.meta) == null ? void 0 : f.pagination) == null ? void 0 : u.limit) + a.meta.pagination.start < ((p = (t = a == null ? void 0 : a.meta) == null ? void 0 : t.pagination) == null ? void 0 : p.total), r = ((h = (b = (y = a == null ? void 0 : a.meta) == null ? void 0 : y.pagination) == null ? void 0 : b.limit) == null ? void 0 : h.start) > 0;
  return {
    meta: {
      ...a == null ? void 0 : a.meta,
      pagination: {
        ...(z = a == null ? void 0 : a.meta) == null ? void 0 : z.pagination,
        ...!!i && { pages: i },
        hasNextPage: l,
        hasPrevPage: r
      }
    },
    ...m(a)
  };
};
export {
  v as normalize,
  m as normalizeContent
};
