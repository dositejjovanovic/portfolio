import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prompt = readline.createInterface({ input, output });
const password = await prompt.question("Administrator password: ", { hideEchoBack: true });
prompt.close();
if (!password) process.exitCode = 1;
else console.log(await bcrypt.hash(password, 12));
