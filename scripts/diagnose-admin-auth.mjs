import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const hash = process.env.ADMIN_PASSWORD_HASH;
const secret = process.env.ADMIN_SESSION_SECRET;
const validHash = typeof hash === "string" && /^\$2[aby]\$\d{2}\$/.test(hash);
console.log(`ADMIN_PASSWORD_HASH: ${hash ? (validHash ? "present and bcrypt-formatted" : "present but not bcrypt-formatted") : "missing"}`);
console.log(`ADMIN_SESSION_SECRET: ${secret && secret.length >= 32 ? "present and sufficiently long" : "missing or too short"}`);
if (process.argv.includes("--verify") && validHash) {
  const prompt = readline.createInterface({ input, output });
  const password = await prompt.question("Password to verify: ", { hideEchoBack: true });
  prompt.close();
  console.log(`Password verification: ${await bcrypt.compare(password, hash) ? "matched" : "did not match"}`);
}
