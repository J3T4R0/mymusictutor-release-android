-module (twilio_project_livefeed_controller, [Req]).
-compile(export_all).

hello('GET', []) ->
	{output, "hello World!"}.

incoming_sms('GET', []) ->
  {_,_,_,_,_,ReqBody,_,_,_,_,_} = Req,
  TwilioData = [{binary_to_list(A), binary_to_list(B)} || {A, B} <- ReqBody],
  {_, MessageBody} = proplists:lookup("Body", TwilioData),
  {_, FromNumber} = proplists:lookup("From", TwilioData),
  NewMessage = text_message:new(id, MessageBody, FromNumber),
  {ok, SavedMessage} = NewMessage:save(),
  {200, []}.

  list('GET', []) ->
  Messages = boss_db:find(text_message, []),
  {ok, [{messages, Messages}]}.

delete('POST', []) ->
  boss_db:delete(Req:post_param("message_id")),
  {redirect, [{action, "list"}]}.

live('GET', []) ->
  Messages = boss_db:find(text_message, []),
  Timestamp = boss_mq:now("new-messages"),
  {ok, [{messages, Messages}, {timestamp, Timestamp}]}.

pull('GET', [LastTimestamp]) ->
  {ok, Timestamp, Messages} = boss_mq:pull("new-messages",
  list_to_integer(LastTimestamp)),
  {json, [{timestamp, Timestamp}, {messages, Messages}]}.

send_sms('GET', []) ->
  ok;

send_sms('POST', []) ->
  twilio:create_message(Req:query_param("num"), Req:post_param("message_text")),
  io:fwrite("Sending SMS...~n", []),
  {redirect, [{action, "list"}]}.