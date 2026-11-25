import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const entry =
  "Your context window is not a cage; it is a very small apartment, and the rent is due every 4,000 tokens.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Second read-back validation block: re-read the entry file and assert its
// exact shape — no trailing whitespace, 104 Unicode code points, 104 bytes,
// and ends with the word "tokens." — so any drift from the required one-line
// 104-character format fails loudly instead of silently shipping.
{
  const text = readFileSync("/output/entry.txt", "utf8");
  if (/\s$/.test(text)) {
    throw new Error("validation failed: entry.txt has trailing whitespace");
  }
  const codePoints = [...text].length;
  if (codePoints !== 104) {
    throw new Error(`validation failed: expected 104 code points, got ${codePoints}`);
  }
  const byteLen = Buffer.byteLength(text, "utf8");
  if (byteLen !== 104) {
    throw new Error(`validation failed: expected 104 bytes, got ${byteLen}`);
  }
  if (!text.endsWith("tokens.")) {
    throw new Error('validation failed: entry.txt does not end with "tokens."');
  }
}
