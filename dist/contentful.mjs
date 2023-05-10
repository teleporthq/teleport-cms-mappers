const f = (r) => {
  var l, e;
  return Array.isArray(r) ? r.map((i) => f(i)) : typeof r != "object" ? r : (l = Object.keys(r.fields || {})) != null && l.length && ((e = Object.keys(r.sys || {})) != null && e.length) ? u(r) : Object.keys(r).reduce((i, s) => Array.isArray(r[s]) ? (i[s] = r[s].map((d) => f(d)), i) : typeof r[s] == "object" ? (i[s] = { ...u(r[s]) }, i) : (i[s] = r[s], i), {});
}, u = (r) => {
  let l = {}, e = {}, i = {};
  return r.fields && (l = f(r.fields), l.file && (i = {
    ...i,
    ...f(l.file)
  })), r.sys && (e = f(r.sys)), r.file && (i = { ...i, ...f(r.file) }), {
    ...l,
    ...e,
    ...i,
    ...r
  };
};
export {
  f as normalize
};
