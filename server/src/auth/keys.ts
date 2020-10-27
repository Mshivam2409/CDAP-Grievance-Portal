import { readFileSync } from "fs";

const privateKey = readFileSync(`${process.env.DIR}/auth/private.pem`);
const publicKey = readFileSync(`${process.env.DIR}/auth/public.pem`);

export { privateKey, publicKey }