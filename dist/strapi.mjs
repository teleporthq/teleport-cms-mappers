function b(a) {
  if (typeof a != "object" || a === null)
    return a;
  const i = {};
  for (const e in a)
    i[e] = b(a[e]);
  return i;
}
const z = (a) => {
  const i = {};
  for (const e in a) {
    const r = a[e];
    if (typeof r == "object" && r !== null && "data" in r && r.data !== null && "id" in r.data && "attributes" in r.data) {
      const l = t(r);
      i[e] = { id: r.data.id, ...l };
    } else
      i[e] = b(r);
  }
  return i;
}, t = (a) => {
  if (a == null || typeof a == "object" && !Object.keys(a).length)
    return null;
  if (Array.isArray(a))
    return {
      data: a.map(P)
    };
  let i = { ...a };
  return a.attributes && (i = {
    ...i,
    ...z(a.attributes)
  }, delete i.attributes), a.data && (i = t(a.data)), i;
}, P = (a) => {
  var d, f, m, u, o, g, y;
  const i = (f = (d = a == null ? void 0 : a.meta) == null ? void 0 : d.pagination) == null ? void 0 : f.total, e = (u = (m = a == null ? void 0 : a.meta) == null ? void 0 : m.pagination) == null ? void 0 : u.limit, r = (g = (o = a == null ? void 0 : a.meta) == null ? void 0 : o.pagination) == null ? void 0 : g.start;
  let l = 0, s = 1;
  i && e && (l = Math.ceil(i / e)), r && e && (s = r / e + 1);
  const p = s < l, h = s >= 2;
  return {
    meta: {
      ...a == null ? void 0 : a.meta,
      pagination: {
        ...(y = a == null ? void 0 : a.meta) == null ? void 0 : y.pagination,
        ...!!l && { pages: l },
        ...!!s && { page: s },
        hasNextPage: p,
        hasPrevPage: h
      }
    },
    ...t(a)
  };
};
export {
  P as normalize,
  t as normalizeContent
};
