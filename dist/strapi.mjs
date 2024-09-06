const f = (t, e) => {
  if (typeof t != "object" || t === null)
    return t;
  const a = {};
  for (const n in t)
    a[n] = f(t[n]);
  return typeof a.url == "string" && a.url.startsWith("/") && (e || (e = process.env.CMS_URL), a.url = `${e}${a.url}`), a;
}, d = (t, e) => {
  const a = {};
  for (const n in t) {
    const o = t[n];
    if (typeof o == "object" && o !== null && "data" in o && o.data !== null && "id" in o.data && "attributes" in o.data) {
      const i = s(o, e);
      a[n] = { id: o.data.id, ...i };
    } else
      Array.isArray(o) ? a[n] = o.map((i) => d(i, e)) : a[n] = f(o, e);
  }
  return a;
}, s = (t, e) => {
  if (Array.isArray(t))
    return {
      data: t.map((n) => s(n, e))
    };
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  let a = { ...t };
  return t.attributes && (a = {
    ...a,
    ...d(t.attributes, e)
  }, delete a.attributes), t.data && (a = s(t.data, e)), a.url?.startsWith("/") && (e || (e = process.env.CMS_URL), a.url = `${e}${a.url}`), a;
}, m = (t, e) => {
  const a = t?.meta?.pagination?.total, n = t?.meta?.pagination?.limit, o = t?.meta?.pagination?.start;
  let i = 0, r = 1;
  a && n && (i = Math.ceil(a / n)), o && n && (r = Math.floor(o / n) + 1);
  const u = r < i, c = r >= 2;
  let l = s(t.data, e);
  return l.data && (l = l.data), {
    meta: {
      ...t?.meta,
      pagination: {
        ...t?.meta?.pagination,
        ...i && { pages: i },
        ...r && { page: r },
        hasNextPage: u,
        hasPrevPage: c
      }
    },
    data: l
  };
};
export {
  m as normalize,
  s as normalizeContent,
  d as normalizeNestedAttributes
};
