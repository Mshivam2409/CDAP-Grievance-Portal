import chalk from "chalk";
import { generateKeyPairSync } from "crypto";
import { readFileSync, writeFileSync } from "fs";

var keys;

try {
    const privateKey = readFileSync(`${process.env.DIR}/auth/private.pem`);
    const publicKey = readFileSync(`${process.env.DIR}/auth/public.pem`);
    keys = { private: privateKey, public: publicKey };
} catch (error) {
    console.log(chalk.red("KEYS NOT FOUND LOCALLY!!!"));
    console.log(chalk.green("GENERATING RSA KEYS!!"));
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        }
    });
    keys = { private: privateKey, public: publicKey };
    try {
        writeFileSync(`${process.env.DIR}/auth/private.pem`, privateKey, 'utf8')
        writeFileSync(`${process.env.DIR}/auth/public.pem`, publicKey, 'utf8')
    } catch (error) {
        console.log(chalk.red("FAILED TO WRITE KEYS!. CONTINUING WITH KEYS IN MEMORY.."));
    }
}

const privateKey = keys.private
const publicKey = keys.public

export { privateKey, publicKey }