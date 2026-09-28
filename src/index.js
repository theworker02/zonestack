
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function b64urlEncode(s) {
  return Buffer.from(String(s), "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function b64urlDecode(s) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(String(s).replace(/-/g, "+").replace(/_/g, "/") + pad, "base64").toString("utf8");
}
function run(argv) {
  const mode = argv[0] || "encode";
  const text = argv.slice(1).join(" ") || "hello";
  return mode === "decode" ? b64urlDecode(text) : b64urlEncode(text);
}

module.exports = { readInput, b64urlEncode, b64urlDecode, run };
