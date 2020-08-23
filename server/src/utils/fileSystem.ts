import * as fs from "fs";
import { join } from "path";

const writeFile = async (path: string, text: string) => {
    fs.writeFileSync(join(process.env.DIR as string, path), text, 'utf-8')
    console.log("File successfully written!")
}

export { writeFile }