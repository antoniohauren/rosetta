export const rosettaKeys = ["pt_BR", "en_US", "es_ES", "pt_PT"] as const;

export type AddRosettaDto = {
  [key in (typeof rosettaKeys)[number]]?: string;
};

export type UpdateRosettaDto = Partial<AddRosettaDto>;

export type RosettaKeys = (typeof rosettaKeys)[number];

export type Reco<T = string> = Record<string, T>;

export type SerializedRosetta = Reco<Reco>;
