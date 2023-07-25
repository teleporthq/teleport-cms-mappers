const i = async (t) => {
  if (t.status == 401 || t.status == 403)
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${t.statusText}`
    );
  if (t.status != 200)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${t.statusText}`
    );
  const e = await t.json();
  if (e.errors)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        e.errors
      )}`
    );
  return e.data[Object.keys(e.data)[0]].edges.map((s) => s.node);
}, u = async (t) => {
  const { projectId: e, query: r } = t, s = `https://cloud.caisy.io/api/v3/e/${e}/graphql`, n = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r
    })
  });
  return i(n);
}, f = async (t) => {
  const { projectId: e, query: r, attribute: s } = t, n = `https://cloud.caisy.io/api/v3/e/${e}/graphql`, o = await fetch(n, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r,
      variables: {
        value: (t == null ? void 0 : t[`${s}`]) ?? ""
      }
    })
  });
  return i(o);
}, p = async (t) => {
  const { projectId: e, query: r } = t, s = `https://cloud.caisy.io/api/v3/e/${e}/graphql`, n = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r,
      variables: {
        first: t.page * t.perPage
      }
    })
  });
  if (n.status == 401 || n.status == 403)
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${n.statusText}`
    );
  if (n.status != 200)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${n.statusText}`
    );
  const o = await n.json();
  if (o.errors)
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        o.errors
      )}`
    );
  const { endCursor: a, hasNextPage: c } = o.data[Object.keys(o.data)[0]].pageInfo;
  if (!c)
    return {};
  const y = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: r,
      variables: {
        first: t.perPage,
        after: a
      }
    })
  });
  return i(y);
}, g = async (t) => await u(t), h = async (t) => await f(t), d = async (t) => await p(t), E = { getEntities: g, getEntyByAttribute: h, getEntitiesWithPagination: d };
export {
  E as default
};
