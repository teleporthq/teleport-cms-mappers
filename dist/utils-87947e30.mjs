const l = (f, n) => f.replace(/\$\{([^}]+)\}/g, (r, s) => {
  const i = s.split(".").map((e) => e.replace(/\[(\d+)\]/g, ".$1").split("."));
  let t = n;
  for (const e of i)
    for (const o of e)
      if (typeof t == "object" && o in t)
        t = t[o];
      else
        return r;
  return t !== void 0 ? t : r;
}), p = (f, n, r) => f.replace(/\$\{([^}]+)\}/g, (s, i) => {
  const t = i.split(".").map((o) => o.replace(/\[(\d+)\]/g, ".$1").split("."));
  let e = { ...n.fields, ...n.sys };
  for (const o of t)
    for (const c of o)
      if (typeof e == "object" && c in e)
        e = e[c];
      else
        return s;
  return r && e && typeof e == "object" && r in e ? e[r] : e && typeof e == "object" && "en-US" in e ? e["en-US"] : typeof e == "string" ? e : s;
});
export {
  l as a,
  p as r
};
