// keepalive.js

// Use global fetch if available (Node 18+), otherwise lazily import node-fetch (ESM)
const fetchUrl = async (url, options) => {
  if (typeof globalThis.fetch === 'function') {
    return globalThis.fetch(url, options);
  }
  const { default: nodeFetch } = await import('node-fetch');
  return nodeFetch(url, options);
};

// Replace with your deployed Python backend URL
const PY_BACKEND_URL = "https://chatbot-python-backend-3.onrender.com";
// Ping interval in milliseconds (default 5 minutes). Override via env KEEPALIVE_INTERVAL_MS
const PING_INTERVAL_MS = Number(process.env.KEEPALIVE_INTERVAL_MS || 5 * 60 * 1000);

console.log("Keep-alive service starting...");
console.log(`Keep-alive target: ${PY_BACKEND_URL}`);
console.log(`Keep-alive interval: ${PING_INTERVAL_MS} ms`);

const pingOnce = async () => {
  try {
    console.log("Pinging backend...");
    const res = await fetchUrl(PY_BACKEND_URL);
    console.log(`✅ Pinged Python backend: ${res.status}`);
  } catch (err) {
    console.error(`❌ Error pinging Python backend: ${err.message}`);
  }
};

// Immediate first ping, then interval
pingOnce();
setInterval(pingOnce, PING_INTERVAL_MS);