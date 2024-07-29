const l = (t) => {
  if (typeof t != "object" || t === null)
    return t;
  const a = {};
  for (const r in t)
    a[r] = l(t[r]);
  return a;
}, s = (t) => {
  const a = {};
  for (const r in t) {
    const e = t[r];
    if (typeof e == "object" && e !== null && "data" in e && e.data !== null && "id" in e.data && "attributes" in e.data) {
      const i = n(e);
      a[r] = { id: e.data.id, ...i };
    } else
      Array.isArray(e) ? a[r] = e.map((i) => s(i)) : a[r] = l(e);
  }
  return a;
}, n = (t) => {
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  if (Array.isArray(t))
    return {
      data: t.map(f)
    };
  let a = { ...t };
  return t.attributes && (a = {
    ...a,
    ...s(t.attributes)
  }, delete a.attributes), t.data && (a = n(t.data)), a;
}, f = (t) => {
  const a = t?.meta?.pagination?.total, r = t?.meta?.pagination?.limit, e = t?.meta?.pagination?.start;
  let i = 0, o = 1;
  a && r && (i = Math.ceil(a / r)), e && r && (o = Math.floor(e / r) + 1);
  const d = o < i, c = o >= 2;
  return {
    meta: {
      ...t?.meta,
      pagination: {
        ...t?.meta?.pagination,
        ...i && { pages: i },
        ...o && { page: o },
        hasNextPage: d,
        hasPrevPage: c
      }
    },
    data: n(t.data)
  };
};
export {
  f as normalize,
  n as normalizeContent,
  s as normalizeNestedAttributes
};
