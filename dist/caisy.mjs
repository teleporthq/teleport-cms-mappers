const g = (t) => {
  var s, i;
  let r = parseInt(t.page);
  (!r || isNaN(r)) && (r = 1);
  const e = ((s = t.pageInfo) == null ? void 0 : s.hasNextPage) ?? !1, o = ((i = t.pageInfo) == null ? void 0 : i.hasPreviousPage) ?? !1, n = t.edges.map((a) => a.node);
  return {
    meta: {
      pagination: {
        total: n.length,
        hasNextPage: e,
        hasPrevPage: o,
        page: r
      }
    },
    data: f(n)
  };
}, f = (t) => Array.isArray(t) && !t.length ? [] : t == null ? t : typeof t == "object" && !Object.keys(t).length ? {} : Array.isArray(t) ? t.map((r) => f(r)) : typeof t == "object" && t.json && t.json.type === "doc" ? h(t) : Object.keys(t).reduce((r, e) => Array.isArray(t[e]) ? (r[e] = t[e].map((o) => f(o)), r) : typeof t[e] == "object" ? (r[e] = { ...f(t[e]) }, r) : (r[e] = t[e], r), {}), h = (t) => t.connections ? !t.json || typeof t.json == "string" ? "" : {
  content: t.json.content.map((e) => {
    if (e.type !== "documentLink" || !t.connections)
      return e;
    const o = t.connections.find(
      (n) => n.id === e.attrs.documentId
    );
    return o && (e.attrs = {
      ...e.attrs,
      src: o.src,
      title: o.title
    }), e;
  }),
  type: t.json.type
} : t.json, j = async (t) => {
  const { projectId: r, query: e } = t, o = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, n = await fetch(o, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e
    })
  });
  if (n.status === 401 || n.status === 403)
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${n.statusText}`
    );
  if (n.status !== 200)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${n.statusText}`
    );
  const s = await n.json();
  if (s.errors)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        s.errors
      )}`
    );
  return g(s.data[Object.keys(s.data)[0]]);
}, w = async (t) => {
  const { projectId: r, query: e, attribute: o } = t, n = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, s = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        value: (t == null ? void 0 : t[`${o}`]) ?? ""
      }
    })
  });
  if (s.status === 401 || s.status === 403)
    throw new Error(
      `getDataByAttribute from caisy auth or permission issue: ${s.statusText}`
    );
  if (s.status !== 200)
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${s.statusText}`
    );
  const i = await s.json();
  if (i.errors)
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        i.errors
      )}`
    );
  if (!i.data)
    return [];
  const a = i.data[Object.keys(i.data)[0]];
  return f([a]);
}, u = async (t) => {
  const { projectId: r, query: e, perPage: o, page: n, after: s = "" } = t, i = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, a = Number.parseInt((t == null ? void 0 : t.page) ?? "1"), d = (a > 1 ? a - 1 : a) * Number.parseInt((t == null ? void 0 : t.perPage) ?? "10"), y = await fetch(i, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        first: d,
        after: s
      }
    })
  });
  if (y.status === 401 || y.status === 403)
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${y.statusText}`
    );
  if (y.status !== 200)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${y.statusText}`
    );
  const c = await y.json();
  if (c.errors)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        c.errors
      )}`
    );
  if (!c.data)
    return [];
  if (a === 1 || s)
    return g(c.data[Object.keys(c.data)[0]]);
  const { endCursor: l } = c.data[Object.keys(c.data)[0]].pageInfo;
  return await u({
    projectId: r,
    query: e,
    perPage: o,
    page: n,
    after: l
  });
}, p = async (t) => await j(t), E = async (t) => await w(t), b = async (t) => await u(t);
export {
  p as getEntities,
  b as getEntitiesWithPagination,
  E as getEntyByAttribute
};
