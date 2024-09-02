const s = (t) => {
  if (typeof t != "object" || t === null)
    return t;
  const a = {};
  for (const r in t)
    a[r] = s(t[r]);
  return a;
}, d = (t) => {
  const a = {};
  for (const r in t) {
    const e = t[r];
    if (typeof e == "object" && e !== null && "data" in e && e.data !== null && "id" in e.data && "attributes" in e.data) {
      const i = l(e);
      a[r] = { id: e.data.id, ...i };
    } else
      Array.isArray(e) ? a[r] = e.map((i) => d(i)) : a[r] = s(e);
  }
  return a;
}, l = (t) => {
  if (Array.isArray(t))
    return {
      data: t.map(l)
    };
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  let a = { ...t };
  return t.attributes && (a = {
    ...a,
    ...d(t.attributes)
  }, delete a.attributes), t.data && (a = l(t.data)), a;
}, m = (t) => {
  const a = t?.meta?.pagination?.total, r = t?.meta?.pagination?.limit, e = t?.meta?.pagination?.start;
  let i = 0, n = 1;
  a && r && (i = Math.ceil(a / r)), e && r && (n = Math.floor(e / r) + 1);
  const c = n < i, f = n >= 2;
  let o = l(t.data);
  return o.data && (o = o.data), {
    meta: {
      ...t?.meta,
      pagination: {
        ...t?.meta?.pagination,
        ...i && { pages: i },
        ...n && { page: n },
        hasNextPage: c,
        hasPrevPage: f
      }
    },
    data: o
  };
};
export {
  m as normalize,
  l as normalizeContent,
  d as normalizeNestedAttributes
};
