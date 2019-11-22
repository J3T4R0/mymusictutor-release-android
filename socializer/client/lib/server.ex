defmodule socializer.ChatService.Server do
  use GRPC.Server, service: socializer.ChatService.Service

  def send_message(request, _stream) do
    socializer.ChatState.put_message(request.chat_message)
    socializer.SendMessageReply.new()
  end

  def fetch_messages(_request, _stream) do
    messages = socializer.ChatState.get_messages()
    socializer.FetchMessagesReply.new(messages: messages)
  end
  
end