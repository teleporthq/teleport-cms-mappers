const u = (s) => {
  const i = Object.keys(s.includes || {}).reduce(
    (e, t) => (s.includes[t].forEach((o) => {
      e[o.sys.id] = o;
    }), e),
    {}
  ), r = [...s.items].filter((e) => !!e.sys);
  return r.forEach((e) => {
    i[e.sys.id] = e;
  }), r.map((e) => {
    const t = l(e, i, 4, 0);
    Object.assign(e, t);
  }), r;
}, l = (s, i, r, e) => {
  const t = JSON.parse(JSON.stringify(s));
  return Object.keys(t.fields).forEach((f) => {
    const o = t.fields[f];
    if (o.nodeType === "document" && o.content.length > 0) {
      t.fields[f].content = o.content.map((a) => {
        if (a.nodeType === "embedded-asset-block") {
          const m = y(
            a.data.target,
            i,
            r,
            e + 1
          );
          return {
            ...a,
            data: {
              ...a.data,
              target: m
            }
          };
        }
        return a;
      });
      return;
    }
    if (Array.isArray(o))
      return t.fields[f] = o.map((a) => a.sys && a.sys.type === "Link" ? y(a, i, r, e + 1) : a), [];
    if (!o.sys) {
      t.fields[f] = o;
      return;
    }
    if (o.sys.type === "Link") {
      t.fields[f] = y(o, i, r, e + 1);
      return;
    }
    return o;
  }), t;
}, y = (s, i, r, e) => {
  if (s.sys.linkType === "Asset")
    return i[s.sys.id] ?? s;
  if (s.sys.linkType === "Entry") {
    if (e >= r)
      return s;
    const t = i[s.sys.id];
    return t ? l(t, i, r, e) : s;
  }
  return s;
}, p = (s) => Array.isArray(s) ? s.map((i) => p(i)) : typeof s != "object" ? s : Object.keys(s.fields || {})?.length && Object.keys(s.sys || {})?.length ? d(s) : Object.keys(s).reduce((i, r) => Array.isArray(s[r]) ? (i[r] = s[r].map((e) => p(e)), i) : typeof s[r] == "object" ? (i[r] = { ...d(s[r]) }, i) : (i[r] = s[r], i), {}), d = (s) => {
  let i = {}, r = {}, e = {};
  s.fields && (i = p(s.fields), i.file && (e = {
    ...e,
    ...p(i.file)
  })), s.sys && (r = p(s.sys), r.contentType?.id && (r = {
    ...r,
    typeId: r.contentType.id
  })), s.file && (e = { ...e, ...p(s.file) });
  const t = {
    ...i,
    ...r,
    ...e,
    ...s
  };
  return delete t.fields, t;
}, b = (s) => {
  let i = 0, r = 1;
  s.total && s.limit && (i = Math.ceil(s.total / s.limit)), s.skip && s.limit && (r = s.skip / s.limit + 1);
  const e = r < i, t = r >= 2, f = u(s);
  return {
    meta: {
      pagination: {
        ..."limit" in s && { limit: s.limit },
        ..."total" in s && { total: s.total },
        ..."skip" in s && { skip: s.skip },
        hasNextPage: e,
        hasPrevPage: t,
        page: r,
        pages: i
      }
    },
    data: p(f)
  };
};
export {
  b as normalize
};
