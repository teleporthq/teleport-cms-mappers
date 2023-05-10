function l(t) {
  if (typeof t != "object" || t === null)
    return t;
  const e = {};
  for (const r in t)
    e[r] = l(t[r]);
  return e;
}
const i = (t) => {
  const e = {};
  for (const r in t) {
    const a = t[r];
    if (typeof a == "object" && a !== null && "data" in a && a.data !== null && "id" in a.data && "attributes" in a.data) {
      const o = n(a);
      e[r] = { id: a.data.id, ...o };
    } else
      e[r] = l(a);
  }
  return e;
}, n = (t) => {
  if (t == null || typeof t == "object" && !Object.keys(t).length)
    return null;
  if (Array.isArray(t))
    return {
      data: t.map(n)
    };
  let e = { ...t };
  return t.attributes && (e = {
    ...e,
    ...i(t.attributes)
  }, delete e.attributes), t.data && (e = n(t.data)), e;
};
export {
  n as normalize
};
