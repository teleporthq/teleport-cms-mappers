const g = (t, r) => {
  let e = r ? parseInt(r) : 1;
  (!e || isNaN(e)) && (e = 1);
  const a = t.pageInfo?.hasNextPage ?? !1, n = t.pageInfo?.hasPreviousPage ?? !1, s = t.edges.map((o) => o.node);
  return {
    meta: {
      pagination: {
        total: s.length,
        hasNextPage: a,
        hasPrevPage: n,
        page: e
      }
    },
    data: y(s)
  };
}, d = (t) => {
  if (!t.data || !Object.keys(t.data).length)
    return {
      meta: {
        pagination: {}
      },
      data: []
    };
  const r = t.data[Object.keys(t.data)[0]];
  return {
    meta: {
      pagination: {}
    },
    data: [y(r)]
  };
}, y = (t) => Array.isArray(t) && !t.length ? [] : t == null ? t : typeof t == "object" && !Object.keys(t).length ? {} : Array.isArray(t) ? t.map((r) => y(r)) : typeof t == "object" && t.json && t.json.type === "doc" ? j(t) : Object.keys(t).reduce((r, e) => Array.isArray(t[e]) ? (r[e] = t[e].map((a) => y(a)), r) : typeof t[e] == "object" ? (r[e] = { ...y(t[e]) }, r) : (r[e] = t[e], r), {}), j = (t) => t.connections ? !t.json || typeof t.json == "string" ? "" : {
  content: t.json.content.map((e) => {
    if (e.type !== "documentLink" || !t.connections)
      return e;
    const a = t.connections.find(
      (n) => n?.__typename == "Asset" && n.id === e.attrs.documentId
    );
    return a && (e.attrs = {
      ...e.attrs,
      src: a.src,
      title: a.title
    }), e;
  }),
  type: t.json.type
} : t.json, w = async (t) => {
  const { projectId: r, query: e } = t, a = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, n = await fetch(a, {
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
  return g(s.data[Object.keys(s.data)[0]]);
}, E = async (t) => {
  const { projectId: r, query: e, attribute: a } = t, n = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, s = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        value: t?.[`${a}`] ?? ""
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
  const o = await s.json();
  if (o.errors)
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        o.errors
      )}`
    );
  return d(o);
}, l = async (t) => {
  const { projectId: r, query: e, perPage: a, page: n, after: s = "" } = t, o = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, c = Number.parseInt(t?.page ?? "1"), u = Number.parseInt(t?.perPage ?? "10"), m = s ? u : (c > 1 ? c - 1 : c) * u, f = await fetch(o, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        first: m,
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
  const i = await f.json();
  if (i.errors)
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        i.errors
      )}`
    );
  if (!i.data)
    return [];
  const { endCursor: h, hasNextPage: p } = i.data[Object.keys(i.data)[0]].pageInfo;
  return c === 1 || !p || s ? g(i.data[Object.keys(i.data)[0]], c.toString()) : await l({
    projectId: r,
    query: e,
    perPage: a,
    page: c.toString(),
    after: h
  });
}, b = async (t) => await w(t), P = async (t) => await E(t), C = async (t) => await l(t), S = (t) => g(t), O = (t) => d(t);
export {
  b as getEntities,
  C as getEntitiesWithPagination,
  P as getEntityByAttribute,
  O as normalizeCaisyItemContent,
  S as normalizeCaisyListContent
};
