const a = ["document_update", "document_delete", "document_create"], i = async (n, d) => {
  const e = n.body, t = e.webhook.trigger;
  if (!a.includes(t)) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not handled: ${t}}`
    );
    return;
  }
  const o = e.metadata.blueprint_id;
  if (!o)
    throw new Error("Content type ID does not exist in the webhook response");
  const c = {
    id: e.metadata.document_id
  };
  d(c, o);
};
export {
  i as revalidate
};
