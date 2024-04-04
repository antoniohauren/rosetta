import m from "mongoose";
import { Rosetta } from "../database/schema";
import type { AddRosettaDto } from "../models/rosetta";

export class RosettaRepository {
  constructor() {
    this.init();
  }

  async addTranslation(category: string, key: string, dto: AddRosettaDto) {
    const { pt_BR, en_US, es_ES, pt_PT } = dto;

    const entry = new Rosetta({
      category,
      key,
      en_US,
      es_ES,
      pt_BR,
      pt_PT,
    });

    await entry.save();
  }

  async updateTranslation(
    category: string,
    key: string,
    dto: Partial<AddRosettaDto>,
  ) {
    await Rosetta.findOneAndUpdate(
      {
        $and: [{ category }, { key }],
      },
      dto,
    );
  }

  async getMissingRosettas() {
    return Rosetta.find({
      $or: [
        { es_ES: { $exists: false } },
        { en_US: { $exists: false } },
        { pt_PT: { $exists: false } },
      ],
    });
  }

  async getMissingRosettasByLang(lang: keyof AddRosettaDto) {
    return Rosetta.find({
      [lang]: { $exists: false },
    });
  }

  async getAllTranslations() {
    return Rosetta.find();
  }

  async init() {
    await m.connect("mongodb://localhost:27017/rosetta");
  }

  async done() {
    await m.disconnect();
  }
}
