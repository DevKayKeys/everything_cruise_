// ===== AI CHAT WIDGET =====
// Replace with your actual Gemini API key
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatClose = document.getElementById('chat-close');

// Conversation history for context
const history = [];

function toggleChat() {
  chatBox.classList.toggle('hidden');
  if (!chatBox.classList.contains('hidden')) {
    chatInput.focus();
    if (chatMessages.children.length === 0) {
      appendMessage('bot', 'Hi there! Welcome to Everything Cruise 🚗 I\'m here to help you find the perfect car or answer any questions about our services. How can I assist you today?');
    }
  }
}

function appendMessage(role, text) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage('user', text);
  chatInput.value = '';
  chatSend.disabled = true;

  // Add to history
  history.push({ role: 'user', parts: [{ text }] });

  // Typing indicator
  const typing = appendMessage('bot', 'Typing...');
  typing.classList.add('typing');

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history,
        systemInstruction: {
          parts: [{
            text: 'You are a helpful customer support assistant for Everything Cruise, a car dealership based in Nigeria. Everything Cruise sells brand new cars, UK used (foreign used) cars, and Nigerian used cars. They also offer car swap services and mechanical assistance. Be concise, friendly, and professional. Help customers with enquiries about available cars, pricing, swapping, and mechanical support. Encourage them to call or visit the showroom for specific stock and pricing.'
          }]
        }
      })
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t get a response. Please try again.';

    typing.remove();
    appendMessage('bot', reply);

    // Add assistant reply to history
    history.push({ role: 'model', parts: [{ text: reply }] });

  } catch (err) {
    typing.remove();
    appendMessage('bot', 'Sorry, something went wrong. Please try again later.');
    console.error(err);
  }

  chatSend.disabled = false;
  chatInput.focus();
}

// Events
chatToggle.addEventListener('click', toggleChat);
chatClose.addEventListener('click', toggleChat);
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
