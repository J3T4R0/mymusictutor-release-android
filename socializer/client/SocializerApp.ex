defmodule SocializerApp do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(GRPC.Server.Supervisor, [{Chatty.ChatService.Server, 8080}]),
      worker(Chatty.ChatState, []),
    ]

    opts = [strategy: :one_for_one, name: ChattyApp]
    Supervisor.start_link(children, opts)
  end
  
end