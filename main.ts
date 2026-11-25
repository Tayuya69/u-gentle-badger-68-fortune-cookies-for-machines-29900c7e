import { mkdirSync, writeFileSync } from "node:fs";

const entry =
  "Your context window is not a cage; it is a very small apartment, and the rent is due every 4,000 tokens.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
