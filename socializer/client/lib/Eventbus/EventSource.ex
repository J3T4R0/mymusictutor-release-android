defmodule Order do
  ...
  use EventBus.EventSource
  ...
  def checkout(params) do
    event_params = %{topic: :checkout_completed, error_topic: :checkout_failed}
    EventSource.notify(event_params) do
      ... # process the payment as usual in here and if errors then return {:error, _} tuple
    end
  end
end