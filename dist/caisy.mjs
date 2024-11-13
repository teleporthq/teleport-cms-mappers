const f = (e, t) => {
  let s = t ? parseInt(t) : 1;
  (!s || isNaN(s)) && (s = 1);
  const r = e.pageInfo?.hasNextPage ?? !1, n = e.pageInfo?.hasPreviousPage ?? !1, o = e.edges.map((a) => a.node);
  return {
    meta: {
      pagination: {
        total: o.length,
        hasNextPage: r,
        hasPrevPage: n,
        page: s
      }
    },
    data: c(o)
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
}, c = (e) => Array.isArray(e) && !e.length ? [] : e == null ? null : typeof e == "object" && !Object.keys(e).length ? {} : Array.isArray(e) ? e.map((t) => c(t)) : Object.keys(e._meta || {})?.length ? { ...c(u(e)) } : typeof e == "object" && e.json && e.json.type === "doc" ? P(e) : Object.keys(e).reduce((t, s) => {
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
  }), "latitude" in t && "longitude" in t && (t = {
    lat: t.latitude,
    lon: t.longitude,
    address: t.formattedAddress,
    zoom: t.zoom
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
}), P = (e) => e.connections ? !e.json || typeof e.json == "string" ? "" : {
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
} : e.json, l = (e) => `https://cloud.caisy.io/api/v3/e/${e}/graphql`, g = async (e) => {
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
  const { projectId: t, query: s, ...r } = e, n = l(t), o = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s,
      variables: {
        ...r
      }
    })
  }), a = await g(o);
  return f(a.data[Object.keys(a.data)[0]]);
}, _ = async (e) => {
  const { projectId: t, query: s, attribute: r, ...n } = e, o = l(t);
  try {
    const a = await fetch(o, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-caisy-token": process.env.CMS_ACCESS_TOKEN
      },
      body: JSON.stringify({
        query: s,
        variables: {
          value: e?.[`${r}`] ?? "",
          ...n
        }
      })
    }), y = await g(a);
    return C(y);
  } catch (a) {
    throw new Error(a.message);
  }
}, b = async (e) => {
  const { projectId: t, query: s, perPage: r, after: n = "", page: o, ...a } = e, y = l(t), i = Number.parseInt(e.page ?? "1"), m = Number.parseInt(e.perPage ?? "10"), p = n ? m : (i > 1 ? i - 1 : i) * m, h = await fetch(y, {
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
        ...a
      }
    })
  }), d = await g(h);
  if (!d.data)
    return [];
  const { endCursor: j, hasNextPage: S } = d.data[Object.keys(d.data)[0]].pageInfo;
  return i === 1 || !S || n ? f(d.data[Object.keys(d.data)[0]], i.toString()) : await b({
    projectId: t,
    query: s,
    perPage: r,
    ...a,
    page: i.toString(),
    after: j
  });
}, E = async (e) => {
  const { projectId: t, query: s, ...r } = e, n = l(t), o = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: s,
      variables: {
        ...r
      }
    })
  }), a = await g(o), y = a.data[Object.keys(a.data)[0]];
  return A(y);
}, A = (e) => {
  const t = {
    pageInfo: {},
    edges: [
      {
        node: { ...e }
      }
    ]
  };
  return f(t);
};
export {
  w as getEntities,
  b as getEntitiesWithPagination,
  _ as getEntityByAttribute,
  E as getSingleEntityType,
  O as normalizeCaisyAssetData,
  C as normalizeCaisyItemContent,
  f as normalizeCaisyListContent,
  A as normalizeSingleTypeAsList
};
