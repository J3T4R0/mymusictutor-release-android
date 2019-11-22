defmodule socializer.ChatState do

  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end
  
  def put_message(message) do
    Agent.update(__MODULE__, &Map.put_new(&1, :os.system_time(:millisecond), message))
  end

  def get_messages() do
    Agent.get(__MODULE__, &(&1)) |> Map.values
  end
  
end