const u = (t, r) => {
  var a, i;
  let e = r ? parseInt(r) : 1;
  (!e || isNaN(e)) && (e = 1);
  const n = ((a = t.pageInfo) == null ? void 0 : a.hasNextPage) ?? !1, o = ((i = t.pageInfo) == null ? void 0 : i.hasPreviousPage) ?? !1, s = t.edges.map((g) => g.node);
  return {
    meta: {
      pagination: {
        total: s.length,
        hasNextPage: n,
        hasPrevPage: o,
        page: e
      }
    },
    data: f(s)
  };
}, f = (t) => Array.isArray(t) && !t.length ? [] : t == null ? t : typeof t == "object" && !Object.keys(t).length ? {} : Array.isArray(t) ? t.map((r) => f(r)) : typeof t == "object" && t.json && t.json.type === "doc" ? h(t) : Object.keys(t).reduce((r, e) => Array.isArray(t[e]) ? (r[e] = t[e].map((n) => f(n)), r) : typeof t[e] == "object" ? (r[e] = { ...f(t[e]) }, r) : (r[e] = t[e], r), {}), h = (t) => t.connections ? !t.json || typeof t.json == "string" ? "" : {
  content: t.json.content.map((e) => {
    if (e.type !== "documentLink" || !t.connections)
      return e;
    const n = t.connections.find(
      (o) => o.id === e.attrs.documentId
    );
    return n && (e.attrs = {
      ...e.attrs,
      src: n.src,
      title: n.title
    }), e;
  }),
  type: t.json.type
} : t.json, j = async (t) => {
  const { projectId: r, query: e } = t, n = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, o = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e
    })
  });
  if (o.status === 401 || o.status === 403)
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${o.statusText}`
    );
  if (o.status !== 200)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${o.statusText}`
    );
  const s = await o.json();
  if (s.errors)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        s.errors
      )}`
    );
  return u(s.data[Object.keys(s.data)[0]]);
}, p = async (t) => {
  const { projectId: r, query: e, attribute: n } = t, o = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, s = await fetch(o, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        value: (t == null ? void 0 : t[`${n}`]) ?? ""
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
  const a = await s.json();
  if (a.errors)
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        a.errors
      )}`
    );
  if (!a.data)
    return [];
  const i = a.data[Object.keys(a.data)[0]];
  return {
    meta: {
      pagination: {}
    },
    data: [f(i)]
  };
}, d = async (t) => {
  const { projectId: r, query: e, perPage: n, page: o, after: s = "" } = t, a = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, i = Number.parseInt((t == null ? void 0 : t.page) ?? "1"), g = (i > 1 ? i - 1 : i) * Number.parseInt((t == null ? void 0 : t.perPage) ?? "10"), y = await fetch(a, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        first: g,
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
  if (i === 1 || s)
    return u(c.data[Object.keys(c.data)[0]], i.toString());
  const { endCursor: l } = c.data[Object.keys(c.data)[0]].pageInfo;
  return await d({
    projectId: r,
    query: e,
    perPage: n,
    page: i.toString(),
    after: l
  });
}, w = async (t) => await j(t), E = async (t) => await p(t), b = async (t) => await d(t);
export {
  w as getEntities,
  b as getEntitiesWithPagination,
  E as getEntyByAttribute
};
