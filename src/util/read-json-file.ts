import fs from "fs";
import path from "path";


export default function readJsonFile(filename: string): any {
    const contents = fs.readFileSync(path.resolve(filename));
    const contentString = Buffer.from(contents).toString();
    const json = JSON.parse(contentString);
    return json;
}