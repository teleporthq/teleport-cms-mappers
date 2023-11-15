const l = (e, t) => {
  let s = t ? parseInt(t) : 1;
  (!s || isNaN(s)) && (s = 1);
  const r = e.pageInfo?.hasNextPage ?? !1, n = e.pageInfo?.hasPreviousPage ?? !1, a = e.edges.map((o) => o.node);
  return {
    meta: {
      pagination: {
        total: a.length,
        hasNextPage: r,
        hasPrevPage: n,
        page: s
      }
    },
    data: c(a)
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
    data: [c(t)]
  };
}, c = (e) => Array.isArray(e) && !e.length ? [] : e == null ? null : typeof e == "object" && !Object.keys(e).length ? {} : Array.isArray(e) ? e.map((t) => c(t)) : Object.keys(e._meta || {})?.length ? { ...c(u(e)) } : typeof e == "object" && e.json && e.json.type === "doc" ? b(e) : Object.keys(e).reduce((t, s) => {
  const r = e[s];
  return r == null ? (t[s] = null, t) : Array.isArray(r) ? (t[s] = r.map((n) => c(n)), t) : typeof r == "object" ? (t[s] = { ...c(u(r)) }, t) : (t[s] = r, t);
}, {}), u = (e) => {
  let t = e;
  return t?._meta && (t = {
    ...t,
    ...t._meta
  }, delete t._meta), t?.__typename === "Asset" ? (t = {
    ...t,
    ...O(t)
  }, t) : (t?.__typename && t.__typename !== "Asset" && (t = {
    // typeId is used by the switch primitive to determine the content/component type of the item
    typeId: t?.__typename,
    ...t
  }), t);
}, O = (e) => ({
  id: e.id,
  name: e.title,
  alt: e.keywords,
  url: e.src,
  assetType: e.originType,
  size: {
    height: e.height,
    width: e.width
  }
}), b = (e) => e.connections ? !e.json || typeof e.json == "string" ? "" : {
  content: e.json.content.map((s) => {
    if (s.type !== "documentLink" || !e.connections)
      return s;
    const r = e.connections.find(
      (n) => n?.__typename == "Asset" && n.id === s.attrs.documentId
    );
    return r && (s.attrs = {
      ...s.attrs,
      src: r.src,
      title: r.title
    }), s;
  }),
  type: e.json.type
} : e.json, d = (e) => `https://cloud.caisy.io/api/v3/e/${e}/graphql`, g = async (e) => {
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
}, w = async (e) => {
  const { projectId: t, query: s } = e, r = d(t), n = await fetch(r, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s
    })
  }), a = await g(n);
  return l(a.data[Object.keys(a.data)[0]]);
}, _ = async (e) => {
  const { projectId: t, query: s, attribute: r } = e, n = d(t);
  try {
    const a = await fetch(n, {
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
    }), o = await g(a);
    return C(o);
  } catch (a) {
    throw new Error(a.message);
  }
}, P = async (e) => {
  const { projectId: t, query: s, perPage: r, after: n = "", page: a, ...o } = e, m = d(t), i = Number.parseInt(e.page ?? "1"), f = Number.parseInt(e.perPage ?? "10"), p = n ? f : (i > 1 ? i - 1 : i) * f, h = await fetch(m, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s,
      variables: {
        first: p,
        after: n,
        ...o
      }
    })
  }), y = await g(h);
  if (!y.data)
    return [];
  const { endCursor: j, hasNextPage: S } = y.data[Object.keys(y.data)[0]].pageInfo;
  return i === 1 || !S || n ? l(y.data[Object.keys(y.data)[0]], i.toString()) : await P({
    projectId: t,
    query: s,
    perPage: r,
    ...o,
    page: i.toString(),
    after: j
  });
}, A = async (e) => {
  const { projectId: t, query: s } = e, r = d(t), n = await fetch(r, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s
    })
  }), a = await g(n);
  let o = a.data[Object.keys(a.data)[0]];
  return o = {
    pageInfo: {},
    edges: [
      {
        node: { ...o }
      }
    ]
  }, l(o);
};
export {
  w as getEntities,
  P as getEntitiesWithPagination,
  _ as getEntityByAttribute,
  A as getSingleEntityType,
  O as normalizeCaisyAssetData,
  C as normalizeCaisyItemContent,
  l as normalizeCaisyListContent
};
