const y = async (o, t) => {
  if (process.env?.TELEPORTHQ_ISR_TOKEN !== o.query?.TELEPORTHQ_ISR_TOKEN)
    return;
  const e = o.body, n = e.sys?.contentType?.sys?.id;
  switch (e.sys.type) {
    case "DeletedEntry": {
      t({ id: e.sys.id }, n);
      break;
    }
    case "Entry": {
      const s = {
        id: e.sys.id,
        ...r(e.fields)
      };
      t(s, n);
      break;
    }
    default:
      throw new Error(
        `[ON-DEMAND_ISR]: Recevied a webhook operation that is not supported ${n}`
      );
  }
}, r = (o) => {
  const t = {};
  return Object.keys(o).forEach((e) => {
    const n = Object.keys(o[e])[0], s = o[e][n];
    typeof s == "object" ? "sys" in s ? t[e] = s.sys.id : !Array.isArray(s) && Object.keys(s).length > 0 ? t[e] = { ...s } : t[e] = s : t[e] = s;
  }), t;
};
export {
  y as revalidate
};
