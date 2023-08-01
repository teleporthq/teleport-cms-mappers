function l(t) {
  if (typeof t != "object" || t === null)
    return t;
  const a = {};
  for (const i in t)
    a[i] = l(t[i]);
  return a;
}
const d = (t) => {
  const a = {};
  for (const i in t) {
    const e = t[i];
    if (typeof e == "object" && e !== null && "data" in e && e.data !== null && "id" in e.data && "attributes" in e.data) {
      const n = o(e);
      a[i] = { id: e.data.id, ...n };
    } else
      a[i] = l(e);
  }
  return a;
}, o = (t) => {
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  if (Array.isArray(t))
    return {
      data: t.map(f)
    };
  let a = { ...t };
  return t.attributes && (a = {
    ...a,
    ...d(t.attributes)
  }, delete a.attributes), t.data && (a = o(t.data)), a;
}, f = (t) => {
  const a = t?.meta?.pagination?.total, i = t?.meta?.pagination?.limit, e = t?.meta?.pagination?.start;
  let n = 0, r = 1;
  a && i && (n = Math.ceil(a / i)), e && i && (r = e / i + 1);
  const s = r < n, c = r >= 2;
  return {
    meta: {
      ...t?.meta,
      pagination: {
        ...t?.meta?.pagination,
        ...!!n && { pages: n },
        ...!!r && { page: r },
        hasNextPage: s,
        hasPrevPage: c
      }
    },
    ...o(t)
  };
};
export {
  f as normalize,
  o as normalizeContent
};
