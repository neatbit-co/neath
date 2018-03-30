import { UserEntity, User } from "./User";

type CreateUserType = { email: string, name: string, givenName: string, familyName: string, provider: string, externalId: string };

export class UserService {
    static async create(user: CreateUserType): Promise<User> {
        const entity = new UserEntity({
            email: user.email,
            name: user.name,
            givenName: user.givenName,
            familyName: user.familyName,
            providers: [
                {
                    provider: user.provider,
                    externalId: user.externalId
                }
            ]
        });
        
        await entity.save();
        return entity;
    }

    static async ensureProvider(id: string, provider: string, externalId: string): Promise<User> {
        let user = await UserEntity.findById(id);
        if (!user.providers.find(x => x.provider === provider && x.externalId === externalId)) {
            user.providers.push({ provider: provider, externalId: externalId });
            await user.save();
        }

        return user;
    }

    static async findByEmail(email: string): Promise<User> {
        const user = await UserEntity.findOne({ email: email });
        return user;
    }

    static async findById(id: string): Promise<User> {
        const user = await UserEntity.findById(id);
        return user;
    }
}