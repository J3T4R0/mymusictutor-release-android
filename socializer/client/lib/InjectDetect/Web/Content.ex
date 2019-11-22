defmodule InjectDetect.Web.Context do 
	 @behaviour Plug

	 import Plug.Conn

	 def init(opts)
	 def call(conn, _) do
	  case build_context(conn) do
	    {:ok, context} ->
	      put_private(conn, :absinthe, %{context: context})
	    {:error, reason} ->
	      conn
	      |> send_resp(403, reason)
	      |> halt()
	    _ ->
	      conn
	      |> send_resp(400, "Bad Request")
	      |> halt()
 	 end
 end

 def build_context(conn) do 
 	with ["Bearer" <> auth_token] <- get_req_headers(conn, "authorization"),
 		{:ok, user_id} <- authorize(auth_token)

 		do 
 			{:ok, %{user_id: user_id}}
 		else 
 			[]	-> {:ok, %{}}
 			error -> error

 		end
 	end

 def authorize(auth_token) do
  InjectDetect.State.User.find(auth_token: auth_token)
  |> case do
       nil  -> {:error, "Invalid authorization token"}
       user -> {:ok, user.id}
     end
end

pipeline :graphql do
	plug :fetch_session
	plug :fetch_flash
	plug InjectDetect.Web.Context
end

scope "/graphql" do 
	pipe_through :graphql 
	forward "/", Absinthe.Plug, schema: InjectDetect.Schema
end

field :user, :user do 
	resolve &resolve_user/2
end

def resolve_user(_args, %{context: %{user_id: user_id}}) do
	{:ok, User.find(user_id)}
end

def resolve_user(_args, _context), do: {:ok, nil}

field :application, :application do
  arg :id, non_null(:string)
  resolve &resolve_application/2
end

def resolve_application(%{id: id}, %{context: %{user_id: user_id}}) do
  case application = Application.find(id) do
    %{user_id: ^user_id} -> {:ok, application}
    _                    -> {:error, %{code: :not_found,
                                       error: "Not found",
                                       message: "Not found"}}
  end
end

def resolve_application(_args, _context), do:
  {:error, %{code: :not_found,
             error: "Not found",
             message: "Not found"}}


field :sign_out, type: :user do
  middleware InjectDetect.Middleware.Auth
  resolve &handle_sign_out/2
end

defmodule InjectDetect.Middleware.Auth do
  @behavior Absinthe.Middleware

  def call(resolution = %{context: %{user_id: _}}, _config) do
    resolution
  end

  def call(resolution, _config) do
    resolution
    |> Absinthe.Resolution.put_result({:error, %{code: :not_authenticated,
                                                 error: "Not authenticated",
                                                 message: "Not authenticated"}})
  end

end