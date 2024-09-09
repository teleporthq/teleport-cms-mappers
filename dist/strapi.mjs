const d = (t, n) => {
  if (typeof t != "object" || t === null)
    return t;
  const a = {};
  for (const e in t) {
    if (typeof t[e] == "object" && t[e] !== null && "data" in t[e] && t[e].data !== null && "id" in t[e].data && "attributes" in t[e].data) {
      const i = r(t[e], n);
      a[e] = { id: t[e].data.id, ...i };
      continue;
    }
    a[e] = d(t[e], n);
  }
  return typeof a.url == "string" && a.url.startsWith("/") && (n || (n = process.env.CMS_URL), a.url = `${n}${a.url}`), a;
}, u = (t, n) => {
  const a = {};
  for (const e in t) {
    const i = t[e];
    if (typeof i == "object" && i !== null && "data" in i && i.data !== null && "id" in i.data && "attributes" in i.data) {
      const l = r(i, n);
      a[e] = { id: i.data.id, ...l };
    } else
      Array.isArray(i) ? a[e] = i.map((l) => u(l, n)) : a[e] = d(i, n);
  }
  return a;
}, r = (t, n) => {
  if (Array.isArray(t))
    return {
      data: t.map((e) => r(e, n))
    };
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  let a = { ...t };
  return t.attributes && (a = {
    ...a,
    ...u(t.attributes, n)
  }, delete a.attributes), t.data && (a = r(t.data, n)), a.url?.startsWith("/") && (n || (n = process.env.CMS_URL), a.url = `${n}${a.url}`), a;
}, m = (t, n) => {
  const a = t?.meta?.pagination?.total, e = t?.meta?.pagination?.limit, i = t?.meta?.pagination?.start;
  let l = 0, o = 1;
  a && e && (l = Math.ceil(a / e)), i && e && (o = Math.floor(i / e) + 1);
  const f = o < l, c = o >= 2;
  let s = r(t.data, n);
  return s.data && (s = s.data), {
    meta: {
      ...t?.meta,
      pagination: {
        ...t?.meta?.pagination,
        ...l && { pages: l },
        ...o && { page: o },
        hasNextPage: f,
        hasPrevPage: c
      }
    },
    data: s
  };
};
export {
  m as normalize,
  r as normalizeContent,
  u as normalizeNestedAttributes
};
