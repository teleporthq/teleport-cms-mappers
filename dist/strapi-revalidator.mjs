const o = ["etnry.create", "entry.update", "entry.delete"], r = async (t, n) => {
  if (process.env?.TELEPORTHQ_ISR_TOKEN !== t.query?.TELEPORTHQ_ISR_TOKEN)
    return;
  const e = t.body;
  if (o.includes(e.event) === !1) {
    console.log(`[ON-DEMAND_ISR]: Received an event that is not allowed: ${e.event}`);
    return;
  }
  n(e.entry, e.uid);
};
export {
  r as revalidate
};
