import {
  type AddRosettaDto,
  type Reco,
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
    return this.repository.addTranslation(category, key, dto);
  }

  async updateRosetta(category: string, key: string, dto: UpdateRosettaDto) {
    return this.repository.updateTranslation(category, key, dto);
  }

  async getMissingRosettas() {
    return this.repository.getMissingRosettas();
  }

  async getMissingRosettasByLang(lang: RosettaKeys) {
    return this.repository.getMissingRosettasByLang(lang);
  }

  async writeFileByLang(lang: RosettaKeys) {
    const data = await this.getSerializedByLang(lang);
    this.fileService.writeFile(lang, data);
  }

  async wirteAllFiles() {
    for (const k of rosettaKeys) {
      await this.writeFileByLang(k);
    }
  }

  async getSerializedByLang(lang: keyof AddRosettaDto) {
    const entries = await this.repository.getAllTranslations();
    const result: SerializedRosetta = {};

    for (const entry of entries) {
      const category: Reco = {};
      category[entry.key] = entry[lang] || "";

      result[entry.category] = category;
    }

    return result;
  }
}
