const s = (r) => Array.isArray(r) ? r.map((i) => s(i)) : typeof r != "object" ? r : r.id && r.attributes ? a(r) : Object.keys(r).reduce((i, u) => Array.isArray(r[u]) ? (i[u] = r[u].map((f) => s(f)), i) : typeof r[u] == "object" ? (i[u] = { ...a(r[u]) }, i) : (i[u] = r[u], i), {}), a = (r) => {
  let i = {}, u = {};
  return r.attributes && (i = s(r.attributes)), r.relations && (u = s(r.relations)), {
    id: r.id,
    ...i,
    ...u,
    ...r
  };
};
export {
  s as normalize
};
