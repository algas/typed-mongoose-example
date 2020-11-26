import { Document, model, Model, Schema, Types } from 'mongoose';
import { SchemaDefinition } from './mongoose-util';

// Schema definitions
interface UserSchemaFields {
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  friends?: Types.ObjectId[];
}

const userSchemaFields: SchemaDefinition<UserSchemaFields> = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  friends: [Schema.Types.ObjectId],
};

const UserSchema: Schema<UserSchemaProperties> = new Schema(userSchemaFields);

// Instance methods
interface UserSchemaProperties extends UserSchemaFields {
  foo: () => void;
}

UserSchema.methods.foo = function() {};

// Virtual properties
interface UserDocument extends Document, UserSchemaFields {
  fullName: string;
}

UserSchema.virtual('fullName').get(function () {
  return [this.firstName, this.lastName].join(' ');
});

// If you use plugins
// UserSchema.plugin(SomePluginSchema, {});
// interface UserModel extends Model<UserDocument>, SomePluginSchema { ... }

// Static methods
interface UserModel extends Model<UserDocument> {
  bar: () => string;
}

UserSchema.statics.bar = function(){
  return 'bar';
}

export const User = model<UserDocument, UserModel>('User', UserSchema);
