const l = (t, e) => {
  let r = e ? parseInt(e) : 1;
  (!r || isNaN(r)) && (r = 1);
  const s = t.pageInfo?.hasNextPage ?? !1, n = t.pageInfo?.hasPreviousPage ?? !1, a = t.edges.map((o) => o.node);
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
}, b = (t) => {
  if (!t.data || !Object.keys(t.data).length)
    return {
      meta: {
        pagination: {}
      },
      data: []
    };
  const e = t.data[Object.keys(t.data)[0]];
  return {
    meta: {
      pagination: {}
    },
    data: [c(e)]
  };
}, c = (t) => Array.isArray(t) && !t.length ? [] : t == null ? t : typeof t == "object" && !Object.keys(t).length ? {} : Array.isArray(t) ? t.map((e) => c(e)) : Object.keys(t._meta || {})?.length ? d(t) : typeof t == "object" && t.json && t.json.type === "doc" ? C(t) : Object.keys(t).reduce((e, r) => Array.isArray(t[r]) ? (e[r] = t[r].map((s) => c(s)), e) : typeof t[r] == "object" ? (e[r] = { ...c(d(t[r])) }, e) : (e[r] = t[r], e), {}), d = (t) => {
  let e = t;
  return e?._meta && (e = {
    ...e,
    ...e._meta
  }, delete e._meta), e;
}, C = (t) => t.connections ? !t.json || typeof t.json == "string" ? "" : {
  content: t.json.content.map((r) => {
    if (r.type !== "documentLink" || !t.connections)
      return r;
    const s = t.connections.find(
      (n) => n?.__typename == "Asset" && n.id === r.attrs.documentId
    );
    return s && (r.attrs = {
      ...r.attrs,
      src: s.src,
      title: s.title
    }), r;
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
  const e = await t.json();
  if (e.errors)
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        e.errors
      )}`
    );
  return e;
}, P = async (t) => {
  const { projectId: e, query: r } = t, s = y(e), n = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r
    })
  }), a = await f(n);
  return l(a.data[Object.keys(a.data)[0]]);
}, p = async (t) => {
  const { projectId: e, query: r, attribute: s } = t, n = y(e);
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
          value: t?.[`${s}`] ?? ""
        }
      })
    }), o = await f(a);
    return b(o);
  } catch (a) {
    throw new Error(a.message);
  }
}, O = async (t) => {
  const { projectId: e, query: r, perPage: s, after: n = "" } = t, a = y(e), o = Number.parseInt(t.page ?? "1"), g = Number.parseInt(t.perPage ?? "10"), u = n ? g : (o > 1 ? o - 1 : o) * g, m = await fetch(a, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r,
      variables: {
        first: u,
        after: n
      }
    })
  }), i = await f(m);
  if (!i.data)
    return [];
  const { endCursor: j, hasNextPage: h } = i.data[Object.keys(i.data)[0]].pageInfo;
  return o === 1 || !h || n ? l(i.data[Object.keys(i.data)[0]], o.toString()) : await O({
    projectId: e,
    query: r,
    perPage: s,
    page: o.toString(),
    after: j
  });
};
export {
  P as getEntities,
  O as getEntitiesWithPagination,
  p as getEntityByAttribute,
  b as normalizeCaisyItemContent,
  l as normalizeCaisyListContent
};
