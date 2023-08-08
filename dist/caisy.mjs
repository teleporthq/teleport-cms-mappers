const l = (e, t) => {
  let r = t ? parseInt(t) : 1;
  (!r || isNaN(r)) && (r = 1);
  const s = e.pageInfo?.hasNextPage ?? !1, a = e.pageInfo?.hasPreviousPage ?? !1, n = e.edges.map((o) => o.node);
  return {
    meta: {
      pagination: {
        total: n.length,
        hasNextPage: s,
        hasPrevPage: a,
        page: r
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
  const t = e.data[Object.keys(e.data)[0]];
  return {
    meta: {
      pagination: {}
    },
    data: [i(t)]
  };
}, i = (e) => Array.isArray(e) && !e.length ? [] : e == null ? e : typeof e == "object" && !Object.keys(e).length ? {} : Array.isArray(e) ? e.map((t) => i(t)) : Object.keys(e._meta || {})?.length ? { ...i(f(e)) } : typeof e == "object" && e.json && e.json.type === "doc" ? O(e) : Object.keys(e).reduce((t, r) => Array.isArray(e[r]) ? (t[r] = e[r].map((s) => i(s)), t) : typeof e[r] == "object" ? (t[r] = { ...i(f(e[r])) }, t) : (t[r] = e[r], t), {}), f = (e) => {
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
  content: e.json.content.map((r) => {
    if (r.type !== "documentLink" || !e.connections)
      return r;
    const s = e.connections.find(
      (a) => a?.__typename == "Asset" && a.id === r.attrs.documentId
    );
    return s && (r.attrs = {
      ...r.attrs,
      src: s.src,
      title: s.title
    }), r;
  }),
  type: e.json.type
} : e.json, y = (e) => `https://cloud.caisy.io/api/v3/e/${e}/graphql`, g = async (e) => {
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
  const { projectId: t, query: r } = e, s = y(t), a = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r
    })
  }), n = await g(a);
  return l(n.data[Object.keys(n.data)[0]]);
}, w = async (e) => {
  const { projectId: t, query: r, attribute: s } = e, a = y(t);
  try {
    const n = await fetch(a, {
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
    }), o = await g(n);
    return C(o);
  } catch (n) {
    throw new Error(n.message);
  }
}, P = async (e) => {
  const { projectId: t, query: r, perPage: s, after: a = "" } = e, n = y(t), o = Number.parseInt(e.page ?? "1"), d = Number.parseInt(e.perPage ?? "10"), m = a ? d : (o > 1 ? o - 1 : o) * d, h = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r,
      variables: {
        first: m,
        after: a
      }
    })
  }), c = await g(h);
  if (!c.data)
    return [];
  const { endCursor: j, hasNextPage: u } = c.data[Object.keys(c.data)[0]].pageInfo;
  return o === 1 || !u || a ? l(c.data[Object.keys(c.data)[0]], o.toString()) : await P({
    projectId: t,
    query: r,
    perPage: s,
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
