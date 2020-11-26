import { Schema, SchemaType, SchemaTypeOpts } from 'mongoose';

type SchemaPropType<T> = T extends string
  ? StringConstructor
  : T extends number
  ? NumberConstructor
  : T extends boolean
  ? BooleanConstructor
  : any;

type SchemaTypeOptions<T> = Omit<SchemaTypeOpts<T>, 'type'> & {
  type?: SchemaPropType<T>;
};

export type SchemaDefinition<T = any> = {
  [K in keyof T]: SchemaTypeOptions<T[K]> | Schema | SchemaType;
};
