import { readFileSync } from "fs";

const privateKey = readFileSync("./private.pem");
const publicKey = readFileSync("./public.pem");

export { privateKey, publicKey }