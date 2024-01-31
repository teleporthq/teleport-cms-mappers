const u = (s) => {
  const i = Object.keys(s.includes || {}).reduce(
    (e, t) => (s.includes[t].forEach((a) => {
      e[a.sys.id] = a;
    }), e),
    {}
  ), r = [...s.items].filter(
    (e) => !!e.sys
  );
  return r.forEach((e) => {
    i[e.sys.id] = e;
  }), r.map((e) => {
    const t = l(e, i, 4, 0);
    Object.assign(e, t);
  }), r;
}, l = (s, i, r, e) => {
  const t = JSON.parse(JSON.stringify(s));
  return Object.keys(t.fields).forEach((f) => {
    const a = t.fields[f];
    if (Array.isArray(a))
      return t.fields[f] = a.map((o) => o.sys && o.sys.type === "Link" ? p(o, i, r, e + 1) : o), [];
    if (a.nodeType === "document" && a.content.length > 0) {
      t.fields[f].content = a.content.map((o) => {
        if (o.nodeType === "embedded-asset-block") {
          const m = p(
            o.data.target,
            i,
            r,
            e + 1
          );
          return {
            ...o,
            data: {
              ...o.data,
              target: m
            }
          };
        }
        return o;
      });
      return;
    }
    if (!a.sys) {
      t.fields[f] = a;
      return;
    }
    if (a.sys.type === "Link") {
      t.fields[f] = p(a, i, r, e + 1);
      return;
    }
    return a;
  }), t;
}, p = (s, i, r, e) => {
  if (s.sys.linkType === "Asset")
    return i[s.sys.id] ?? s;
  if (s.sys.linkType === "Entry") {
    if (e >= r)
      return s;
    const t = i[s.sys.id];
    return t ? l(t, i, r, e) : s;
  }
}, d = (s) => Array.isArray(s) ? s.map((i) => d(i)) : typeof s != "object" ? s : Object.keys(s.fields || {})?.length && Object.keys(s.sys || {})?.length ? y(s) : Object.keys(s).reduce((i, r) => Array.isArray(s[r]) ? (i[r] = s[r].map((e) => d(e)), i) : typeof s[r] == "object" ? (i[r] = { ...y(s[r]) }, i) : (i[r] = s[r], i), {}), y = (s) => {
  let i = {}, r = {}, e = {};
  s.fields && (i = d(s.fields), i.file && (e = {
    ...e,
    ...d(i.file)
  })), s.sys && (r = d(s.sys), r.contentType?.id && (r = {
    ...r,
    typeId: r.contentType.id
  })), s.file && (e = { ...e, ...d(s.file) });
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
    data: d(f)
  };
};
export {
  b as normalize
};
