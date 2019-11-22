%EventBus.Model.Event{
  id: String.t | integer(), # required
  transaction_id: String.t | integer(), # optional
  topic: atom(), # required
  data: any() # required,
  initialized_at: integer(), # optional
  occurred_at: integer(), # optional
  source: String.t(), # optional
  ttl: integer() # optional
}