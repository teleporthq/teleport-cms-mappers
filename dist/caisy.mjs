const o = async (t) => {
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
}, i = async (t) => {
  const { projectId: e, query: n } = t, s = `https://cloud.caisy.io/api/v3/e/${e}/graphql`, r = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: n
    })
  });
  return o(r);
}, a = async (t) => {
  const { projectId: e, query: n } = t, s = `https://cloud.caisy.io/api/v3/e/${e}/graphql`, r = await fetch(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: n,
      variables: {
        // value: params['name']
        value: (t == null ? void 0 : t[`${attribute}`]) || ""
      }
    })
  });
  return o(r);
}, c = async (t) => i(t), y = async (t, e, n) => a({ projectId: t, query: e, attribute: n });
export {
  c as getEntities,
  y as getEntyByAttribute
};
