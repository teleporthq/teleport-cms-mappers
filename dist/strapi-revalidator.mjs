const o = [
  "etnry.create",
  "entry.update",
  "entry.delete",
  "entry.publish",
  "entry.unpublish"
], r = async (t, n) => {
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
