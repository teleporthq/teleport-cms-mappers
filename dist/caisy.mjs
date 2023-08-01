const d = (t, r) => {
  let e = r ? parseInt(r) : 1;
  (!e || isNaN(e)) && (e = 1);
  const s = t.pageInfo?.hasNextPage ?? !1, n = t.pageInfo?.hasPreviousPage ?? !1, a = t.edges.map((o) => o.node);
  return {
    meta: {
      pagination: {
        total: a.length,
        hasNextPage: s,
        hasPrevPage: n,
        page: e
      }
    },
    data: c(a)
  };
}, m = (t) => {
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
    data: [c(r)]
  };
}, c = (t) => Array.isArray(t) && !t.length ? [] : t == null ? t : typeof t == "object" && !Object.keys(t).length ? {} : Array.isArray(t) ? t.map((r) => c(r)) : typeof t == "object" && t.json && t.json.type === "doc" ? p(t) : Object.keys(t).reduce((r, e) => Array.isArray(t[e]) ? (r[e] = t[e].map((s) => c(s)), r) : typeof t[e] == "object" ? (r[e] = { ...c(t[e]) }, r) : (r[e] = t[e], r), {}), p = (t) => t.connections ? !t.json || typeof t.json == "string" ? "" : {
  content: t.json.content.map((e) => {
    if (e.type !== "documentLink" || !t.connections)
      return e;
    const s = t.connections.find(
      (n) => n?.__typename == "Asset" && n.id === e.attrs.documentId
    );
    return s && (e.attrs = {
      ...e.attrs,
      src: s.src,
      title: s.title
    }), e;
  }),
  type: t.json.type
} : t.json, y = (t) => `https://cloud.caisy.io/api/v3/e/${t}/graphql`, f = async (t) => {
  if (t.status === 401 || t.status === 403)
    throw new Error(
      `Caisy auth or permission issue: ${t.statusText}`
    );
  if (t.status !== 200)
    throw new Error(
      `Internal error fetching entries from Caisy: ${t.statusText}`
    );
  const r = await t.json();
  if (r.errors)
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        r.errors
      )}`
    );
  return r;
}, P = async (t) => {
  const { projectId: r, query: e } = t, s = y(r), n = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e
    })
  }), a = await f(n);
  return d(a.data[Object.keys(a.data)[0]]);
}, S = async (t) => {
  const { projectId: r, query: e, attribute: s } = t, n = y(r);
  try {
    const a = await fetch(n, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-caisy-token": process.env.CMS_ACCESS_TOKEN
      },
      body: JSON.stringify({
        query: e,
        variables: {
          value: t?.[`${s}`] ?? ""
        }
      })
    }), o = await f(a);
    return m(o);
  } catch (a) {
    throw new Error(a.message);
  }
}, C = async (t) => {
  const { projectId: r, query: e, perPage: s, after: n = "" } = t, a = y(r), o = Number.parseInt(t.page ?? "1"), g = Number.parseInt(t.perPage ?? "10"), l = n ? g : (o > 1 ? o - 1 : o) * g, u = await fetch(a, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: e,
      variables: {
        first: l,
        after: n
      }
    })
  }), i = await f(u);
  if (!i.data)
    return [];
  const { endCursor: j, hasNextPage: h } = i.data[Object.keys(i.data)[0]].pageInfo;
  return o === 1 || !h || n ? d(i.data[Object.keys(i.data)[0]], o.toString()) : await C({
    projectId: r,
    query: e,
    perPage: s,
    page: o.toString(),
    after: j
  });
};
export {
  P as getEntities,
  C as getEntitiesWithPagination,
  S as getEntityByAttribute,
  m as normalizeCaisyItemContent,
  d as normalizeCaisyListContent
};
