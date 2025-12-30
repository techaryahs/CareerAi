exports.chat = async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      reply: "⚠️ Message history is required"
    });
  }

  // Get last user message
  const lastUserMessage = messages
    .filter(m => m.sender === "user")
    .pop();

  const userText = lastUserMessage?.text?.trim();

  if (!userText) {
    return res.json({
      reply: "🤖 Please ask a valid question."
    });
  }

  // ⏳ Simulate AI thinking time (15 seconds)
  await new Promise(resolve => setTimeout(resolve, 15000));

  // 🧠 Dynamic backend-generated reply (no static rules)
  const reply = `🤖 I received your question:

"${userText}"

I am processing your request and will soon provide intelligent, detailed answers about careers, colleges, and education.`;

  res.json({ reply });
};
