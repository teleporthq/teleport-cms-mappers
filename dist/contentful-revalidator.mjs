const a = async (o, s) => {
  const e = o.body, n = e.sys?.contentType?.sys?.id;
  switch (e.sys.type) {
    case "DeletedEntry": {
      s({ id: e.sys.id }, n);
      break;
    }
    case "Entry": {
      const t = {
        id: e.sys.id,
        ...r(e.fields)
      };
      s(t, n);
      break;
    }
    default:
      throw new Error(
        `[ON-DEMAND_ISR]: Recevied a webhook operation that is not supported ${n}`
      );
  }
}, r = (o) => {
  const s = {};
  return Object.keys(o).forEach((e) => {
    const n = Object.keys(o[e])[0], t = o[e][n];
    typeof t == "object" ? "sys" in t ? s[e] = t.sys.id : !Array.isArray(t) && Object.keys(t).length > 0 ? s[e] = { ...t } : s[e] = t : s[e] = t;
  }), s;
};
export {
  a as revalidate
};
