import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
import { fromSchema } from 'schema.type';

const schemaObj = { //: SchemaDefinition
    email: String,
    password: String,
    emailValidated: {
        default: false,
        type: Boolean,
    },
};

export type User = fromSchema<typeof schemaObj>;

export interface UserDocument extends Document, User {
    toObject: () => User;
}

export interface UserModel extends Model<UserDocument> { }

export const UserSchema = new Schema(schemaObj);

export const User = model<UserDocument, UserModel>('User', UserSchema);
