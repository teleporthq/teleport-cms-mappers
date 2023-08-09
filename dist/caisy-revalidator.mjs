const a = ["document_update"], i = async (n, d) => {
  const t = n.body, e = t.webhook.trigger;
  if (!a.includes(e)) {
    console.log(
      `[ON-DEMAND_ISR]: Received an event that is not handled: ${e}}`
    );
    return;
  }
  const o = t.metadata.blueprint_id;
  if (!o)
    throw new Error("Content type ID does not exist in the webhook response");
  const c = {
    id: t.metadata.document_id
  };
  d(c, o);
};
export {
  i as revalidate
};
