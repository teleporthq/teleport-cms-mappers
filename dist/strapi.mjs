const s = (t, n) => {
  if (typeof t != "object" || t === null)
    return t;
  const e = {};
  if (Array.isArray(t))
    return t.map((a) => u({ obj: { data: { ...a } } }).obj);
  for (const a in t) {
    if (typeof t[a] == "object" && t[a] !== null && "data" in t[a] && t[a].data !== null && "id" in t[a].data && "attributes" in t[a].data) {
      const i = o(t[a], n);
      e[a] = { id: t[a].data.id, ...i };
      continue;
    }
    if (a === "data")
      return s(t[a], n);
    e[a] = s(t[a], n);
  }
  return typeof e.url == "string" && e.url.startsWith("/") && (n || (n = process.env.CMS_URL), e.url = `${n}${e.url}`), e;
}, u = (t, n) => {
  const e = {};
  for (const a in t) {
    const i = t[a];
    if (typeof i == "object" && i !== null && "data" in i && i.data !== null && "id" in i.data && "attributes" in i.data) {
      const r = o(i, n);
      e[a] = { id: i.data.id, ...r };
    } else
      Array.isArray(i) ? e[a] = i.map((r) => u(r, n)) : e[a] = s(i, n);
  }
  return e;
}, o = (t, n) => {
  if (Array.isArray(t))
    return {
      data: t.map((a) => o(a, n))
    };
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  let e = { ...t };
  return t.attributes && (e = {
    ...e,
    ...u(t.attributes, n)
  }, delete e.attributes), t.data && (e = o(t.data, n)), e.url?.startsWith("/") && (n || (n = process.env.CMS_URL), e.url = `${n}${e.url}`), e;
}, m = (t, n) => {
  const e = t?.meta?.pagination?.total, a = t?.meta?.pagination?.limit, i = t?.meta?.pagination?.start;
  let r = 0, l = 1;
  e && a && (r = Math.ceil(e / a)), i && a && (l = Math.floor(i / a) + 1);
  const f = l < r, c = l >= 2;
  let d = o(t.data, n);
  return d.data && (d = d.data), {
    meta: {
      ...t?.meta,
      pagination: {
        ...t?.meta?.pagination,
        ...r && { pages: r },
        ...l && { page: l },
        hasNextPage: f,
        hasPrevPage: c
      }
    },
    data: d
  };
};
export {
  m as normalize,
  o as normalizeContent,
  u as normalizeNestedAttributes
};
