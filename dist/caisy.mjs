const l = (e, t) => {
  let s = t ? parseInt(t) : 1;
  (!s || isNaN(s)) && (s = 1);
  const r = e.pageInfo?.hasNextPage ?? !1, a = e.pageInfo?.hasPreviousPage ?? !1, n = e.edges.map((o) => o.node);
  return {
    meta: {
      pagination: {
        total: n.length,
        hasNextPage: r,
        hasPrevPage: a,
        page: s
      }
    },
    data: i(n)
  };
}, C = (e) => {
  if (!e.data || !Object.keys(e.data).length)
    return {
      meta: {
        pagination: {}
      },
      data: []
    };
  let t = e.data[Object.keys(e.data)[0]];
  return t?.edges && (t = t.edges.map((s) => s.node)?.[0]), {
    meta: {
      pagination: {}
    },
    data: [i(t)]
  };
}, i = (e) => Array.isArray(e) && !e.length ? [] : e == null ? e : typeof e == "object" && !Object.keys(e).length ? {} : Array.isArray(e) ? e.map((t) => i(t)) : Object.keys(e._meta || {})?.length ? { ...i(f(e)) } : typeof e == "object" && e.json && e.json.type === "doc" ? O(e) : Object.keys(e).reduce((t, s) => Array.isArray(e[s]) ? (t[s] = e[s].map((r) => i(r)), t) : typeof e[s] == "object" ? (t[s] = { ...i(f(e[s])) }, t) : (t[s] = e[s], t), {}), f = (e) => {
  let t = e;
  return t?._meta && (t = {
    ...t,
    ...t._meta
  }, delete t._meta), t?.__typename === "Asset" && (t = {
    ...t,
    ...b(t)
  }), t;
}, b = (e) => ({
  id: e.id,
  name: e.title,
  alt: e.keywords,
  url: e.src,
  assetType: e.originType,
  size: {
    height: e.height,
    width: e.width
  }
}), O = (e) => e.connections ? !e.json || typeof e.json == "string" ? "" : {
  content: e.json.content.map((s) => {
    if (s.type !== "documentLink" || !e.connections)
      return s;
    const r = e.connections.find(
      (a) => a?.__typename == "Asset" && a.id === s.attrs.documentId
    );
    return r && (s.attrs = {
      ...s.attrs,
      src: r.src,
      title: r.title
    }), s;
  }),
  type: e.json.type
} : e.json, y = (e) => `https://cloud.caisy.io/api/v3/e/${e}/graphql`, d = async (e) => {
  if (e.status === 401 || e.status === 403)
    throw new Error(
      `Caisy auth or permission issue: ${e.statusText}`
    );
  if (e.status !== 200)
    throw new Error(
      `Internal error fetching entries from Caisy: ${e.statusText}`
    );
  const t = await e.json();
  if (t.errors)
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        t.errors
      )}`
    );
  return t;
}, S = async (e) => {
  const { projectId: t, query: s } = e, r = y(t), a = await fetch(r, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s
    })
  }), n = await d(a);
  return l(n.data[Object.keys(n.data)[0]]);
}, w = async (e) => {
  const { projectId: t, query: s, attribute: r } = e, a = y(t);
  try {
    const n = await fetch(a, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-caisy-token": process.env.CMS_ACCESS_TOKEN
      },
      body: JSON.stringify({
        query: s,
        variables: {
          value: e?.[`${r}`] ?? ""
        }
      })
    }), o = await d(n);
    return C(o);
  } catch (n) {
    throw new Error(n.message);
  }
}, P = async (e) => {
  const { projectId: t, query: s, perPage: r, after: a = "" } = e, n = y(t), o = Number.parseInt(e.page ?? "1"), g = Number.parseInt(e.perPage ?? "10"), m = a ? g : (o > 1 ? o - 1 : o) * g, h = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s,
      variables: {
        first: m,
        after: a
      }
    })
  }), c = await d(h);
  if (!c.data)
    return [];
  const { endCursor: j, hasNextPage: u } = c.data[Object.keys(c.data)[0]].pageInfo;
  return o === 1 || !u || a ? l(c.data[Object.keys(c.data)[0]], o.toString()) : await P({
    projectId: t,
    query: s,
    perPage: r,
    page: o.toString(),
    after: j
  });
};
export {
  S as getEntities,
  P as getEntitiesWithPagination,
  w as getEntityByAttribute,
  b as normalizeCaisyAssetData,
  C as normalizeCaisyItemContent,
  l as normalizeCaisyListContent
};
