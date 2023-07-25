const c = async (t) => {
  if (t.status === 401 || t.status === 403)
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${t.statusText}`
    );
  if (t.status !== 200)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${t.statusText}`
    );
  const r = await t.json();
  if (r.errors)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        r.errors
      )}`
    );
  return r.data ? r.data[Object.keys(r.data)[0]].edges.map((s) => s.node) : [];
}, u = async (t) => {
  const { projectId: r, query: o } = t, s = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, i = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: o
    })
  });
  return c(i);
}, f = async (t) => {
  const { projectId: r, query: o, attribute: s } = t, i = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, e = await fetch(i, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: o,
      variables: {
        value: (t == null ? void 0 : t[`${s}`]) ?? ""
      }
    })
  });
  if (e.status === 401 || e.status === 403)
    throw new Error(
      `getDataByAttribute from caisy auth or permission issue: ${e.statusText}`
    );
  if (e.status !== 200)
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${e.statusText}`
    );
  const n = await e.json();
  if (n.errors)
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        n.errors
      )}`
    );
  return n.data ? [n.data[Object.keys(n.data)[0]]] : [];
}, g = async (t) => {
  const { projectId: r, query: o } = t, s = `https://cloud.caisy.io/api/v3/e/${r}/graphql`, i = Number.parseInt((t == null ? void 0 : t.page) ?? "1") * Number.parseInt((t == null ? void 0 : t.perPage) ?? "10"), e = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: o,
      variables: {
        first: i,
        after: ""
      }
    })
  });
  if (e.status === 401 || e.status === 403)
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${e.statusText}`
    );
  if (e.status !== 200)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${e.statusText}`
    );
  const n = await e.json();
  if (n.errors)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        n.errors
      )}`
    );
  if (!n.data)
    return [];
  const { endCursor: a } = n.data[Object.keys(n.data)[0]].pageInfo, y = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: o,
      variables: {
        first: Number.parseInt(t == null ? void 0 : t.perPage) ?? 10,
        after: a ?? ""
      }
    })
  });
  return c(y);
}, h = async (t) => await u(t), d = async (t) => await f(t), p = async (t) => await g(t);
export {
  h as getEntities,
  p as getEntitiesWithPagination,
  d as getEntyByAttribute
};
