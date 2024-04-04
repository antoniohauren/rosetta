import fs from "node:fs";
import type { MyTuple, RosettaKeys } from "../models/rosetta";

export class FileService {

  readFile(lang: RosettaKeys) {
    const input = "./input";
    try {
      return fs.readFileSync(`${input}/${lang}.json`).toString();
    } catch(err) {
      console.log("file not found", `${lang}.json`);
    }
  }

  writeFile(lang: RosettaKeys, data: MyTuple) {
    const output = "./output";

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    fs.writeFileSync(`${output}/${lang}.json`, JSON.stringify(data, null, 2));
  }
}
