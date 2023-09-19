const m = (e, t) => {
  let r = t ? parseInt(t) : 1;
  (!r || isNaN(r)) && (r = 1);
  const s = e.pageInfo?.hasNextPage ?? !1, n = e.pageInfo?.hasPreviousPage ?? !1, a = e.edges.map((o) => o.node);
  return {
    meta: {
      pagination: {
        total: a.length,
        hasNextPage: s,
        hasPrevPage: n,
        page: r
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
  return t?.edges && (t = t.edges.map((r) => r.node)?.[0]), {
    meta: {
      pagination: {}
    },
    data: [c(t)]
  };
}, c = (e) => Array.isArray(e) && !e.length ? [] : e == null ? null : typeof e == "object" && !Object.keys(e).length ? {} : Array.isArray(e) ? e.map((t) => c(t)) : Object.keys(e._meta || {})?.length ? { ...c(f(e)) } : typeof e == "object" && e.json && e.json.type === "doc" ? O(e) : Object.keys(e).reduce((t, r) => {
  const s = e[r];
  return s == null ? (t[r] = null, t) : Array.isArray(s) ? (t[r] = s.map((n) => c(n)), t) : typeof s == "object" ? (t[r] = { ...c(f(s)) }, t) : (t[r] = s, t);
}, {}), f = (e) => {
  let t = e;
  return t?._meta && (t = {
    ...t,
    ...t._meta
  }, delete t._meta), t?.__typename === "Asset" ? (t = {
    ...t,
    ...b(t)
  }, t) : (t?.__typename && t.__typename !== "Asset" && (t = {
    // typeId is used by the switch primitive to determine the content/component type of the item
    typeId: t?.__typename,
    ...t
  }), t);
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
  content: e.json.content.map((r) => {
    if (r.type !== "documentLink" || !e.connections)
      return r;
    const s = e.connections.find(
      (n) => n?.__typename == "Asset" && n.id === r.attrs.documentId
    );
    return s && (r.attrs = {
      ...r.attrs,
      src: s.src,
      title: s.title
    }), r;
  }),
  type: e.json.type
} : e.json, d = (e) => `https://cloud.caisy.io/api/v3/e/${e}/graphql`, l = async (e) => {
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
  const { projectId: t, query: r } = e, s = d(t), n = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r
    })
  }), a = await l(n);
  return m(a.data[Object.keys(a.data)[0]]);
}, A = async (e) => {
  const { projectId: t, query: r, attribute: s } = e, n = d(t);
  try {
    const a = await fetch(n, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-caisy-token": process.env.CMS_ACCESS_TOKEN
      },
      body: JSON.stringify({
        query: r,
        variables: {
          value: e?.[`${s}`] ?? ""
        }
      })
    }), o = await l(a);
    return P(o);
  } catch (a) {
    throw new Error(a.message);
  }
}, S = async (e) => {
  const { projectId: t, query: r, perPage: s, after: n = "", page: a, ...o } = e, u = d(t), i = Number.parseInt(e.page ?? "1"), g = Number.parseInt(e.perPage ?? "10"), h = n ? g : (i > 1 ? i - 1 : i) * g, p = await fetch(u, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r,
      variables: {
        first: h,
        after: n,
        ...o
      }
    })
  }), y = await l(p);
  if (!y.data)
    return [];
  const { endCursor: j, hasNextPage: C } = y.data[Object.keys(y.data)[0]].pageInfo;
  return i === 1 || !C || n ? m(y.data[Object.keys(y.data)[0]], i.toString()) : await S({
    projectId: t,
    query: r,
    perPage: s,
    ...o,
    page: i.toString(),
    after: j
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
