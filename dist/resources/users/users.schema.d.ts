import { Document, Model, Schema } from 'mongoose';
import { fromSchema } from 'schema.type';
declare const schemaObj: {
    email: StringConstructor;
    password: StringConstructor;
    facebookProfile: typeof Schema.Types.Mixed;
    emailValidated: {
        default: boolean;
        type: BooleanConstructor;
    };
};
export declare type User = fromSchema<typeof schemaObj>;
export interface UserDocument extends Document, User {
    toObject: () => User;
}
export interface UserModel extends Model<UserDocument> {
}
export declare const UserSchema: Schema<any>;
export declare const User: UserModel;
export {};
