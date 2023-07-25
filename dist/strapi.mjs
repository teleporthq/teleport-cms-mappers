function t(a) {
  if (typeof a != "object" || a === null)
    return a;
  const i = {};
  for (const r in a)
    i[r] = t(a[r]);
  return i;
}
const x = (a) => {
  const i = {};
  for (const r in a) {
    const l = a[r];
    if (typeof l == "object" && l !== null && "data" in l && l.data !== null && "id" in l.data && "attributes" in l.data) {
      const m = s(l);
      i[r] = { id: l.data.id, ...m };
    } else
      i[r] = t(l);
  }
  return i;
}, s = (a) => {
  if (a == null || typeof a == "object" && !Object.keys(a).length)
    return null;
  if (Array.isArray(a))
    return {
      data: a.map(N)
    };
  let i = { ...a };
  return a.attributes && (i = {
    ...i,
    ...x(a.attributes)
  }, delete i.attributes), a.data && (i = s(a.data)), i;
}, N = (a) => {
  var g, d, f, p, e, u, y, b, h, z, P, k, v, A, O, j;
  let i, r;
  (d = (g = a == null ? void 0 : a.meta) == null ? void 0 : g.pagination) != null && d.total && ((p = (f = a == null ? void 0 : a.meta) == null ? void 0 : f.pagination) != null && p.limit) && (i = Math.ceil(a.meta.pagination.total / a.meta.pagination.limit)), (u = (e = a == null ? void 0 : a.meta) == null ? void 0 : e.pagination) != null && u.start && ((b = (y = a == null ? void 0 : a.meta) == null ? void 0 : y.pagination) != null && b.limit) && (r = a.meta.pagination.start / a.meta.pagination.limit + 1);
  const l = ((z = (h = a == null ? void 0 : a.meta) == null ? void 0 : h.pagination) == null ? void 0 : z.limit) + a.meta.pagination.start < ((k = (P = a == null ? void 0 : a.meta) == null ? void 0 : P.pagination) == null ? void 0 : k.total), m = ((O = (A = (v = a == null ? void 0 : a.meta) == null ? void 0 : v.pagination) == null ? void 0 : A.limit) == null ? void 0 : O.start) > 0;
  return {
    meta: {
      ...a == null ? void 0 : a.meta,
      pagination: {
        ...(j = a == null ? void 0 : a.meta) == null ? void 0 : j.pagination,
        ...!!i && { pages: i },
        ...!!r && { page: r },
        hasNextPage: l,
        hasPrevPage: m
      }
    },
    ...s(a)
  };
};
export {
  N as normalize,
  s as normalizeContent
};
