import { useEffect, useState } from "react";
import axios from "axios";

export const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = () => {
    const eventSource = new EventSource("http://localhost:3000/connect");
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:3000/post-message", {
      message: value,
      id: new Date(),
    });
  };

  return (
    <>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
      <div>
        {messages.map((item) => (
          <div key={item.id}>{item.message}</div>
        ))}
      </div>
    </>
  );
};
