const m = (e, t) => {
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
}, P = (e) => {
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
}, c = (e) => Array.isArray(e) && !e.length ? [] : e == null ? e : typeof e == "object" && !Object.keys(e).length ? {} : Array.isArray(e) ? e.map((t) => c(t)) : Object.keys(e._meta || {})?.length ? { ...c(l(e)) } : typeof e == "object" && e.json && e.json.type === "doc" ? O(e) : Object.keys(e).reduce((t, s) => {
  const r = e[s];
  return r == null ? (t[s] = r, t) : Array.isArray(r) ? (t[s] = r.map((n) => c(n)), t) : typeof r == "object" ? (t[s] = { ...c(l(r)) }, t) : (t[s] = r, t);
}, {}), l = (e) => {
  let t = e;
  return t?._meta && (t = {
    ...t,
    ...t._meta
  }, delete t._meta), t?.__typename === "Asset" ? t = {
    ...t,
    ...b(t)
  } : t = {
    // typeId is used by the switch primitive to determine the content/component type of the item
    typeId: t?.__typename,
    ...t
  }, t;
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
  return m(a.data[Object.keys(a.data)[0]]);
}, A = async (e) => {
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
    return P(o);
  } catch (a) {
    throw new Error(a.message);
  }
}, S = async (e) => {
  const { projectId: t, query: s, perPage: r, after: n = "", page: a, ...o } = e, u = d(t), i = Number.parseInt(e.page ?? "1"), f = Number.parseInt(e.perPage ?? "10"), h = n ? f : (i > 1 ? i - 1 : i) * f, j = await fetch(u, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s,
      variables: {
        first: h,
        after: n,
        ...o
      }
    })
  }), y = await g(j);
  if (!y.data)
    return [];
  const { endCursor: p, hasNextPage: C } = y.data[Object.keys(y.data)[0]].pageInfo;
  return i === 1 || !C || n ? m(y.data[Object.keys(y.data)[0]], i.toString()) : await S({
    projectId: t,
    query: s,
    perPage: r,
    ...o,
    page: i.toString(),
    after: p
  });
};
export {
  w as getEntities,
  S as getEntitiesWithPagination,
  A as getEntityByAttribute,
  b as normalizeCaisyAssetData,
  P as normalizeCaisyItemContent,
  m as normalizeCaisyListContent
};
