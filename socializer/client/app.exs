def application do
    [
      mod: {ChattyApp, []},
      applications: [:grpc]
    ]
end