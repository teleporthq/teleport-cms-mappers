function m(a) {
  if (typeof a != "object" || a === null)
    return a;
  const i = {};
  for (const l in a)
    i[l] = m(a[l]);
  return i;
}
const f = (a) => {
  const i = {};
  for (const l in a) {
    const r = a[l];
    if (typeof r == "object" && r !== null && "data" in r && r.data !== null && "id" in r.data && "attributes" in r.data) {
      const e = t(r);
      i[l] = { id: r.data.id, ...e };
    } else
      i[l] = m(r);
  }
  return i;
}, t = (a) => {
  if (a == null || typeof a == "object" && !Object.keys(a).length)
    return null;
  if (Array.isArray(a))
    return {
      data: a.map(u)
    };
  let i = { ...a };
  return a.attributes && (i = {
    ...i,
    ...f(a.attributes)
  }, delete i.attributes), a.data && (i = t(a.data)), i;
}, u = (a) => {
  var l, r, e, s, d;
  let i;
  return (r = (l = a == null ? void 0 : a.meta) == null ? void 0 : l.pagination) != null && r.total && ((s = (e = a == null ? void 0 : a.meta) == null ? void 0 : e.pagination) != null && s.limit) && (i = Math.ceil(a.meta.pagination.total / a.meta.pagination.limit)), {
    meta: {
      ...a == null ? void 0 : a.meta,
      pagination: {
        ...(d = a == null ? void 0 : a.meta) == null ? void 0 : d.pagination,
        ...!!i && { pages: i }
      }
    },
    ...t(a)
  };
};
export {
  u as normalize,
  t as normalizeContent
};
