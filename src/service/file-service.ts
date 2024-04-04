import fs from "node:fs";
import type { RosettaKeys, SerializedRosetta } from "../models/rosetta";

export class FileService {

  readFile(lang: RosettaKeys) {
    const input = "./input";

    return fs.readFileSync(`${input}/${lang}.json`).toString();
  }

  writeFile(lang: RosettaKeys, data: SerializedRosetta) {
    const output = "./output";

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    fs.writeFileSync(`${output}/${lang}.json`, JSON.stringify(data, null, 2));
  }
}
