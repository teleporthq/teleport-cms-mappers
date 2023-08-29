const o = "https://api.flotiq.com", e = (r) => Array.isArray(r) ? r.map((t) => e(t)) : typeof r != "object" ? r : Object.keys(r).reduce((t, a) => {
  const s = r[a];
  return Array.isArray(s) ? (s.length === 1 ? (t[a] = s[0], r[a][0].url && (t[a].url = `${o}${r[a][0].url}`)) : (s.forEach((u) => {
    u.url && (u.url = `${o}${u.url}`);
  }), t[a] = s), t) : (t[a] = r[a], t);
}, {}), p = (r) => {
  const l = r?.total_count, t = r?.total_pages, a = r?.current_page, s = r?.count, u = a < t, i = a >= 2, g = e(r.data);
  return {
    meta: {
      ...r?.meta,
      pagination: {
        ...r?.meta?.pagination,
        total_count: l,
        total_pages: t,
        current_page: a,
        count: s,
        hasNextPage: u,
        hasPrevPage: i
      }
    },
    data: g
  };
};
export {
  p as normalize,
  e as normalizeContent
};
