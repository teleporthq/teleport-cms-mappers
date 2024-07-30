const s = (a) => {
  if (typeof a != "object" || a === null)
    return a;
  const t = {};
  for (const r in a)
    t[r] = s(a[r]);
  return t;
}, d = (a) => {
  const t = {};
  for (const r in a) {
    const e = a[r];
    if (typeof e == "object" && e !== null && "data" in e && e.data !== null && "id" in e.data && "attributes" in e.data) {
      const i = n(e);
      t[r] = { id: e.data.id, ...i };
    } else
      Array.isArray(e) ? t[r] = e.map((i) => d(i)) : t[r] = s(e);
  }
  return t;
}, n = (a) => {
  if (a == null || typeof a == "object" && !Object.keys(a).length)
    return null;
  if (Array.isArray(a))
    return {
      data: a.map(n)
    };
  let t = { ...a };
  return a.attributes && (t = {
    ...t,
    ...d(a.attributes)
  }, delete t.attributes), a.data && (t = n(a.data)), t;
}, m = (a) => {
  const t = a?.meta?.pagination?.total, r = a?.meta?.pagination?.limit, e = a?.meta?.pagination?.start;
  let i = 0, o = 1;
  t && r && (i = Math.ceil(t / r)), e && r && (o = Math.floor(e / r) + 1);
  const c = o < i, f = o >= 2, l = n(a.data);
  return Array.isArray(l?.data?.data) && (l.data = l.data.data), {
    meta: {
      ...a?.meta,
      pagination: {
        ...a?.meta?.pagination,
        ...i && { pages: i },
        ...o && { page: o },
        hasNextPage: c,
        hasPrevPage: f
      }
    },
    data: n(a.data)
  };
};
export {
  m as normalize,
  n as normalizeContent,
  d as normalizeNestedAttributes
};
