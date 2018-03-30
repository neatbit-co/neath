import * as passport from "passport";
import { config, schema } from "../../config";
import { Strategy } from "passport-google-oauth20";
import { UserService } from "../../users";
import Logger from "../../logger"

export const useGoogle = () => {
    const passportConfig = {
        clientID: config.get(nameof.full(schema.authentication.google.clientId, 1)),
        clientSecret: config.get(nameof.full(schema.authentication.google.clientSecret, 1)),
        callbackURL: 'http://localhost:3000/google/redirect'
    };

    Logger.debug(`Using Google authentication: ${passportConfig.clientID}`);
    if (passportConfig.clientID) {
        passport.use(new Strategy(passportConfig, async function (request, accessToken: string, refreshToken: string, profile: any, done: Function) {
            try {
                Logger.debug("Validating authentication using Google");

                if (profile.emails.length === 0) {
                    Logger.error(`Cannot create account because email is not available from Google for profile ID ${profile.id}`)
                    return done(null, false); // Authentication error
                }

                const email = profile.emails[0].value;
                let user = await UserService.findByEmail(email);
                if (!user) {
                    Logger.debug(`Creating new profile for ${email} based on Google auth`);
                    user = await UserService.create({
                        email: email,
                        name: profile.displayName,
                        givenName: profile.name.givenName,
                        familyName: profile.name.familyName,
                        provider: profile.provider,
                        externalId: profile.id
                    });
                } else {
                    Logger.debug(`Using existing profile for ${email} based on Google auth`);
                    user = await UserService.ensureProvider(user.id, profile.provider, profile.id);
                }

                Logger.debug("Google authentication was successful");

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }));
    }
}