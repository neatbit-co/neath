import { Schema, model, Document } from "mongoose";

const providerBindingSchema = new Schema({
    provider: { type: String, required: true },
    externalId: { type: String, required: true },
});

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    givenName: String,
    familyName: String,
    providers: [providerBindingSchema]
});

export interface User {
    id?: any;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
    providers: [{
        provider: string;
        externalId: string;
    }];
}

export interface UserModel extends User, Document {
    
}

export const UserEntity = model<UserModel>("User", userSchema);