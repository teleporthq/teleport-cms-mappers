const s = ["Update", "Create", "Delete"], d = async (o, c) => {
  const e = o.body, t = e.action;
  if (!s.includes(t)) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not handled: ${t}}`
    );
    return;
  }
  const n = e.contentTypeName;
  if (!n)
    throw new Error("Content type ID does not exist in the webhook response");
  const a = {
    ...e.payload
  };
  c(a, n);
};
export {
  d as revalidate
};
