function l(a) {
  if (typeof a != "object" || a === null)
    return a;
  const t = {};
  for (const e in a)
    t[e] = l(a[e]);
  return t;
}
const s = (a) => {
  const t = {};
  for (const e in a) {
    const i = a[e];
    if (typeof i == "object" && i !== null && "data" in i && i.data !== null && "id" in i.data && "attributes" in i.data) {
      const o = r(i);
      t[e] = { id: i.data.id, ...o };
    } else
      t[e] = l(i);
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
}, d = (a) => {
  var e;
  let t;
  return a.meta.pagination.total && a.meta.pagination.limit && (t = Math.ceil(a.meta.pagination.total / a.meta.pagination.limit)), {
    meta: {
      ...a == null ? void 0 : a.meta,
      pagination: {
        ...(e = a == null ? void 0 : a.meta) == null ? void 0 : e.pagination,
        pages: t
      }
    },
    ...r(a)
  };
};
export {
  d as normalize,
  r as normalizeContent
};
