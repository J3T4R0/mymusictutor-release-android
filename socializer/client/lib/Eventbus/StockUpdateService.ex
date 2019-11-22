defmodule StockUpdateService do
  ...
  def process({topic, id}) do
    spawn(fn ->     
      event = EventBus.fetch_event({topic, id})
      # do sth with event.data and/or any other event attributes
      ...
      # mark event as completed for this consumer
      EventBus.mark_as_completed({StockUpdateService, topic, id})
    end)
  end
end