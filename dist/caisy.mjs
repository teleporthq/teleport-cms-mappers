const u = (t, r) => {
  var i, a;
  let e = r ? parseInt(r) : 1;
  (!e || isNaN(e)) && (e = 1);
  const o = ((i = t.pageInfo) == null ? void 0 : i.hasNextPage) ?? !1, n = ((a = t.pageInfo) == null ? void 0 : a.hasPreviousPage) ?? !1, s = t.edges.map((g) => g.node);
  return {
    meta: {
      pagination: {
        total: s.length,
        hasNextPage: o,
        hasPrevPage: n,
        page: e
      }
    },
    data: y(s)
  };
}, y = (t) => Array.isArray(t) && !t.length ? [] : t == null ? t : typeof t == "object" && !Object.keys(t).length ? {} : Array.isArray(t) ? t.map((r) => y(r)) : typeof t == "object" && t.json && t.json.type === "doc" ? w(t) : Object.keys(t).reduce((r, e) => Array.isArray(t[e]) ? (r[e] = t[e].map((o) => y(o)), r) : typeof t[e] == "object" ? (r[e] = { ...y(t[e]) }, r) : (r[e] = t[e], r), {}), w = (t) => t.connections ? !t.json || typeof t.json == "string" ? "" : {
  content: t.json.content.map((e) => {
    if (e.type !== "documentLink" || !t.connections)
      return e;
    const o = t.connections.find(
      (n) => (n == null ? void 0 : n.__typename) == "Asset" && n.id === e.attrs.documentId
    );
    return o && (e.attrs = {
      ...e.attrs,
      src: o.src,
      title: o.title
    }), e;
  }),
  type: t.json.type
} : t.json, E = async (t) => {
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
      `getEntitiesData from caisy auth or permission issue: ${n.statusText}`
    );
  if (n.status !== 200)
    throw new Error(
      `getEntitiesData from caisy - internal error fetching entries from caisy: ${n.statusText}`
    );
  const s = await n.json();
  if (s.errors)
    throw new Error(
      `getEntitiesData from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        s.errors
      )}`
    );
  return u(s.data[Object.keys(s.data)[0]]);
}, p = async (t) => {
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
    return {
      meta: {
        pagination: {}
      },
      data: []
    };
  const a = i.data[Object.keys(i.data)[0]];
  return {
    meta: {
      pagination: {}
    },
    data: [y(a)]
  };
}, d = async (t) => {
  const { projectId: r, query: e, perPage: o, page: n, after: s = "" } = t, i = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, a = Number.parseInt((t == null ? void 0 : t.page) ?? "1"), g = Number.parseInt((t == null ? void 0 : t.perPage) ?? "10"), l = s ? g : (a > 1 ? a - 1 : a) * g, f = await fetch(i, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        first: l,
        after: s
      }
    })
  });
  if (f.status === 401 || f.status === 403)
    throw new Error(
      `getEntitiesByPage from caisy auth or permission issue: ${f.statusText}`
    );
  if (f.status !== 200)
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${f.statusText}`
    );
  const c = await f.json();
  if (c.errors)
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        c.errors
      )}`
    );
  if (!c.data)
    return [];
  const { endCursor: h, hasNextPage: j } = c.data[Object.keys(c.data)[0]].pageInfo;
  return a === 1 || !j || s ? u(c.data[Object.keys(c.data)[0]], a.toString()) : await d({
    projectId: r,
    query: e,
    perPage: o,
    page: a.toString(),
    after: h
  });
}, b = async (t) => await E(t), m = async (t) => await p(t), P = async (t) => await d(t), S = (t) => u(t);
export {
  b as getEntities,
  P as getEntitiesWithPagination,
  m as getEntityByAttribute,
  S as normalizeCaisyContent
};
