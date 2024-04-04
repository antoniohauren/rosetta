export const rosettaKeys = ["pt_BR", "en_US", "es_ES", "pt_PT"] as const;

export type AddRosettaDto = {
  [key in (typeof rosettaKeys)[number]]?: string;
};

export type UpdateRosettaDto = Partial<AddRosettaDto>;

export type RosettaKeys = (typeof rosettaKeys)[number];

export type Reco<T = string> = Record<string, T>;

type StringOrObject = string | { [key: string]: string | object };
export type MyTuple = Record<string, StringOrObject>;

// TODO: check this type
export type SerializedRosetta = Record<string, Reco>;
