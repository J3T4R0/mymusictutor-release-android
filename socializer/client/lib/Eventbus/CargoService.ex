defmodule CargoService do
  use GenServer
  ...
  def process({topic, id}) do
    GenServer.cast(__MODULE__, event_shadow)
  end
  
  def handle_cast({topic, id}, state) do
    payment_data = EventBus.fetch_event_data({topic, id})
    # do sth with payment_data
    ...
    # mark event as completed for this consumer
    EventBus.mark_as_completed({CargoService, topic, id})
    {:noreply, state}
  end
end