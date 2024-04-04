import m from "mongoose";

const rosettaSchema = new m.Schema({
	key: { type: String, required: true },
	category: { type: String, required: true },
	pt_BR: { type: String },
	en_US: { type: String },
	pt_PT: { type: String },
	es_ES: { type: String },
});

rosettaSchema.index({ key: 1, category: 1 }, { unique: true });

export type Rosetta = m.InferSchemaType<typeof rosettaSchema>;
export const Rosetta = m.model("Schema", rosettaSchema);
