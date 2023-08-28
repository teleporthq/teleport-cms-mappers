const m = (e, t) => {
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
    data: c(n)
  };
}, b = (e) => {
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
}, c = (e) => Array.isArray(e) && !e.length ? [] : e == null ? e : typeof e == "object" && !Object.keys(e).length ? {} : Array.isArray(e) ? e.map((t) => c(t)) : Object.keys(e._meta || {})?.length ? { ...c(l(e)) } : typeof e == "object" && e.json && e.json.type === "doc" ? S(e) : Object.keys(e).reduce((t, s) => Array.isArray(e[s]) ? (t[s] = e[s].map((r) => c(r)), t) : typeof e[s] == "object" ? (t[s] = c(l(e[s])), t) : (t[s] = e[s], t), {}), l = (e) => {
  let t = e;
  return t?._meta && (t = {
    ...t,
    ...t._meta
  }, delete t._meta), t?.__typename === "Asset" && (t = {
    ...t,
    ...O(t)
  }), t;
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
}), S = (e) => e.connections ? !e.json || typeof e.json == "string" ? "" : {
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
} : e.json, g = (e) => `https://cloud.caisy.io/api/v3/e/${e}/graphql`, d = async (e) => {
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
  const { projectId: t, query: s } = e, r = g(t), a = await fetch(r, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s
    })
  }), n = await d(a);
  return m(n.data[Object.keys(n.data)[0]]);
}, A = async (e) => {
  const { projectId: t, query: s, attribute: r } = e, a = g(t);
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
    return b(o);
  } catch (n) {
    throw new Error(n.message);
  }
}, p = async (e) => {
  const { projectId: t, query: s, perPage: r, after: a = "", page: n, ...o } = e, h = g(t), i = Number.parseInt(e.page ?? "1"), f = Number.parseInt(e.perPage ?? "10"), j = a ? f : (i > 1 ? i - 1 : i) * f, u = await fetch(h, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s,
      variables: {
        first: j,
        after: a,
        ...o
      }
    })
  }), y = await d(u);
  if (!y.data)
    return [];
  const { endCursor: C, hasNextPage: P } = y.data[Object.keys(y.data)[0]].pageInfo;
  return i === 1 || !P || a ? m(y.data[Object.keys(y.data)[0]], i.toString()) : await p({
    projectId: t,
    query: s,
    perPage: r,
    ...o,
    page: i.toString(),
    after: C
  });
};
export {
  w as getEntities,
  p as getEntitiesWithPagination,
  A as getEntityByAttribute,
  O as normalizeCaisyAssetData,
  b as normalizeCaisyItemContent,
  m as normalizeCaisyListContent
};
