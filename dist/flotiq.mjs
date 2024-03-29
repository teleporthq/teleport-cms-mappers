const m = "https://api.flotiq.com", t = (r) => Array.isArray(r) ? r.length === 0 ? {} : r.length === 1 && (r[0].url || r[0].dataUrl) ? l(r[0]) : r.map((e) => t(e)) : typeof r != "object" ? r : Object.keys(r.internal || {})?.length ? { ...t(o(r)) } : r.url || r.dataUrl ? l(r) : r.blocks ? {} : Object.keys(r).reduce((e, s) => {
  const i = r[s];
  return e[s] = t(i), e;
}, {}), o = (r) => {
  let a = r;
  return a?.internal && (a = {
    ...a,
    ...a.internal,
    typeId: a.internal.contentType
    // used for cms mixed type
  }, delete a.internal), a;
}, l = (r) => r ? r.dataUrl ? {
  url: r.dataUrl
} : {
  id: r.id,
  url: `${m}/${r.url}`,
  size: {
    width: r.width,
    height: r.height
  },
  assetType: r.mimeType,
  name: r.fileName
} : {}, d = (r) => {
  const a = r?.total_count, e = r?.total_pages, s = r?.current_page, i = r?.count, u = s < e, g = s >= 2, p = t(r.data);
  return {
    meta: {
      ...r?.meta,
      pagination: {
        ...r?.meta?.pagination,
        total_count: a,
        pages: e,
        page: s,
        count: i,
        hasNextPage: u,
        hasPrevPage: g
      }
    },
    data: p
  };
};
export {
  d as normalize,
  t as normalizeContent
};
