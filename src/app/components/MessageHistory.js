
  export default function MessageHistory({ messages, messageEndRef }) {
    return (
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-end">
              <p className="bg-teal-500 p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg">
                <span className="font-semibold">You:</span> {msg.user}
              </p>
            </div>
            <div className="flex justify-start">
              <p className="bg-gray-100 text-black p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg">
                <span className="font-semibold">AI:</span> {msg.ai}
              </p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    );
  }