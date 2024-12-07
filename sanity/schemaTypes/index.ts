import { type SchemaTypeDefinition } from "sanity";

import { startUps } from "./startup";
import { authorType } from "./authorType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [startUps, authorType],
};
