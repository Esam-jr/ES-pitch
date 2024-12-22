import { type SchemaTypeDefinition } from "sanity";

import { startUps } from "./startup";
import { authorType } from "./authorType";
import { playlist } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [startUps, authorType, playlist],
};
