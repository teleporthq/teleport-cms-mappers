const l = (s, f) => s.replace(/\$\{([^}]+)\}/g, (r, n) => {
  const i = n.split(".").map((e) => e.replace(/\[(\d+)\]/g, ".$1").split("."));
  let t = f;
  for (const e of i)
    for (const o of e)
      if (typeof t == "object" && o in t)
        t = t[o];
      else
        return r;
  return t !== void 0 ? t : r;
}), p = (s, f, r) => s.replace(/\$\{([^}]+)\}/g, (n, i) => {
  const t = i.split(".").map((o) => o.replace(/\[(\d+)\]/g, ".$1").split("."));
  let e = f.fields;
  for (const o of t)
    for (const c of o)
      if (typeof e == "object" && c in e)
        e = e[c];
      else
        return n;
  return r && e && typeof e == "object" && r in e ? e[r] : e && typeof e == "object" && "en-US" in e ? e["en-US"] : n;
});
export {
  l as a,
  p as r
};
