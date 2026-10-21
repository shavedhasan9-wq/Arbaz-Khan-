
import React, { useState } from "react";

export default function App() {
  const [tab, setTab] = useState("home");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [action, setAction] = useState("");
  const [approved, setApproved] = useState(false);

  function addTask(e) {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, { title: task, done: false }]);
    setTask("");
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;

    setChat([
      ...chat,
      { role: "user", text: message },
      {
        role: "assistant",
        text:
          "आपका निर्देश प्राप्त हुआ। यह शुरुआती संस्करण है। " +
          "असली AI जवाब के लिए सुरक्षित AI API कनेक्शन जोड़ना होगा।",
      },
    ]);
    setMessage("");
  }

  return (
    <div style={styles.app}>
      <header>
        <h1>🤖 मेरा AI Assistant</h1>
        <p>आपका Personal Digital Assistant</p>
      </header>

      <nav style={styles.nav}>
        {[
          ["home", "🏠 Home"],
          ["chat", "💬 Assistant"],
          ["tasks", "✅ Tasks"],
          ["approval", "🔐 Permission"],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </nav>

      {tab === "home" && (
        <section style={styles.card}>
          <h2>नमस्ते! 👋</h2>
          <p>मैं आपके डिजिटल काम व्यवस्थित करने में मदद करूँगा।</p>
          <p>
            🔒 नियम: आपकी स्पष्ट अनुमति के बिना कोई बाहरी कार्रवाई नहीं।
          </p>
          <button onClick={() => setTab("tasks")}>
            आज का प्लान बनाएँ
          </button>
          <button onClick={() => setTab("chat")}>
            Assistant से बात करें
          </button>
        </section>
      )}

      {tab === "chat" && (
        <section style={styles.card}>
          <h2>AI Assistant</h2>
          <div style={{ minHeight: 100 }}>
            {chat.map((item, index) => (
              <p key={index}>
                <b>{item.role === "user" ? "आप" : "Assistant"}:</b>{" "}
                {item.text}
              </p>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="अपना निर्देश लिखें..."
              style={styles.input}
            />
            <button type="submit">भेजें</button>
          </form>
        </section>
      )}

      {tab === "tasks" && (
        <section style={styles.card}>
          <h2>मेरे काम</h2>
          <form onSubmit={addTask}>
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="नया काम लिखें..."
              style={styles.input}
            />
            <button type="submit">+ काम जोड़ें</button>
          </form>

          {tasks.map((item, index) => (
            <div key={index} style={styles.task}>
              <label>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() =>
                    setTasks(
                      tasks.map((t, i) =>
                        i === index ? { ...t, done: !t.done } : t
                      )
                    )
                  }
                />
                <span
                  style={{
                    textDecoration: item.done ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </span>
              </label>
            </div>
          ))}
        </section>
      )}

      {tab === "approval" && (
        <section style={styles.card}>
          <h2>Permission Center 🔐</h2>
          <p>
            किसी बाहरी कार्रवाई से पहले उसका विवरण लिखें और अपनी अनुमति
            दर्ज करें।
          </p>
          <textarea
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setApproved(false);
            }}
            placeholder="कौन-सी कार्रवाई करनी है?"
            style={styles.input}
          />
          <button
            onClick={() => {
              if (action.trim()) setApproved(true);
            }}
          >
            अनुमति दर्ज करें
          </button>
          {approved && (
            <p>
              अनुमति स्थानीय डेमो में दर्ज है। कोई वास्तविक संदेश,
              भुगतान या बाहरी कार्रवाई नहीं हुई है।
            </p>
          )}
        </section>
      )}
    </div>
  );
}

const styles = {
  app: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    background: "#f3f6fb",
    color: "#172033",
    minHeight: "100vh",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 2px 10px #0000000d",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    margin: "8px 0",
    borderRadius: 8,
    border: "1px solid #ccd4e0",
    fontSize: 16,
  },
  task: {
    padding: 10,
    borderBottom: "1px solid #e5e7eb",
  },
};
