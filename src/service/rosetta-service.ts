import type { Rosetta } from "../database/schema";
import { flattenArray } from "../helper/array.helper";
import { JsonParse } from "../helper/json.helper";
import { unflattenObject } from "../helper/object.helper";
import {
  type AddRosettaDto,
  type MyTuple,
  type RosettaKeys,
  type SerializedRosetta,
  type UpdateRosettaDto,
  rosettaKeys,
} from "../models/rosetta";
import type { RosettaRepository } from "../repository/rosetta-repository";
import type { FileService } from "./file-service";

export class RosettaService {
  constructor(
    private readonly repository: RosettaRepository,
    private readonly fileService: FileService,
  ) {}

  async addRosetta(category: string, key: string, dto: AddRosettaDto) {
    return this.repository.addRosetta(category, key, dto);
  }

  async updateRosetta(category: string, key: string, dto: UpdateRosettaDto) {
    return this.repository.updateRosetta(category, key, dto);
  }

  private keyCategoryToArray(rosettas: Rosetta[]) {
    const result: Record<string, string[]> = {};

    for (const { key, category } of rosettas) {
      result[category] ??= [];
      result[category].push(key);
    }

    return result;
  }

  async getMissingRosettas() {
    const entries = await this.repository.getMissingRosettas();

    return this.keyCategoryToArray(entries);
  }

  async getMissingRosettasByLang(lang: RosettaKeys) {
    const entries = await this.repository.getMissingRosettasByLang(lang);

    return this.keyCategoryToArray(entries);
  }

  async writeFileByLang(lang: RosettaKeys) {
    const data = await this.getSerializedByLang(lang);
    this.fileService.writeFile(lang, data);
  }

  async writeAllFiles() {
    for (const k of rosettaKeys) {
      await this.writeFileByLang(k);
    }
  }

  private async loopThoughtEntries(
    category: string,
    lang: RosettaKeys,
    entries: [string, string][],
  ) {
    const flatten = flattenArray(entries);

    for (const [key, value] of flatten) {
      const found = await this.repository.getRosetta(category, key);

      if (found.length) {
        await this.updateRosetta(category, key, {
          [lang]: value,
        });
      } else {
        await this.addRosetta(category, key, {
          [lang]: value,
        });
      }
    }
  }

  async addRosettaFromFile(lang: RosettaKeys) {
    const data = this.fileService.readFile(lang);

    if (!data) {
      return;
    }

    const json = JsonParse<SerializedRosetta>(data);
    const categories = Object.keys(json);

    for (const category of categories) {
      const entries = Object.entries(json[category]);

      await this.loopThoughtEntries(category, lang, entries);
    }
  }

  async addAllRosettasFromFile() {
    for (const k of rosettaKeys) {
      await this.addRosettaFromFile(k);
    }
  }

  async getSerializedByLang(lang: RosettaKeys) {
    const entries = await this.repository.getAllRosettas();
    const result: MyTuple = {};

    for (const entry of entries) {
      const category: MyTuple = this.serialize(entry, lang);

      Object.assign(category, result[entry.category]);
      result[entry.category] = category as SerializedRosetta;
    }

    return result;
  }

  private serialize(entry: Rosetta, lang: RosettaKeys) {
    const category: MyTuple = {};

    if (entry.key.includes(".")) {
      const [key, ...rest] = entry.key.split(".");
      category[key] = unflattenObject(rest, entry[lang] || "");
    } else {
      category[entry.key] = entry[lang] || "";
    }

    return category;
  }
}
