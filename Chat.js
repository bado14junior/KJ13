
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!inputMsg.trim() || !username.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: inputMsg,
      username,
      createdAt: serverTimestamp(),
    });
    setInputMsg("");
  };

  return (
    <div>
      <input
        placeholder="Votre pseudo"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid gray" }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.username}</b> <small>{msg.createdAt?.toDate().toLocaleString()}</small>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        placeholder="Votre message..."
        value={inputMsg}
        onChange={(e) => setInputMsg(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}
