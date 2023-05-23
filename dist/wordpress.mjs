const s = (r) => {
  var n, l, d;
  if (r == null || typeof r == "object" && !Object.keys(r).length)
    return null;
  if (Array.isArray(r))
    return r.map(s);
  const e = { ...r };
  if ((n = e == null ? void 0 : e.title) != null && n.rendered)
    try {
      const t = new DOMParser().parseFromString(((l = e == null ? void 0 : e.title) == null ? void 0 : l.rendered) || "", "text/html");
      e.title.rendered = ((d = t == null ? void 0 : t.documentElement) == null ? void 0 : d.textContent) || e.title.rendered;
    } catch {
    }
  return e;
};
export {
  s as normalize
};
