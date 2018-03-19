import * as passport from "passport";
import { config, schema } from "../../config";
import { Strategy } from "passport-google-oauth20";

export const useGoogle = () => {
  const passportConfig = {
    clientID: config.get(nameof.full(schema.authentication.google.clientId, 1)),
    clientSecret: config.get(nameof.full(schema.authentication.google.clientSecret, 1)),
    callbackURL: 'http://localhost:3000/google/redirect'
  };

  console.log("GOOGLE: " + passportConfig.clientID);
  if (passportConfig.clientID) {
    passport.use(new Strategy(passportConfig, function (request, accessToken, refreshToken, profile, done) {
      // See if this user already exists
      /* let user = users.getUserByExternalId('google', profile.id);
      if (!user) {
        // They don't, so register them
        user = users.createUser(profile.displayName, 'google', profile.id);
      } */
      console.log(profile);
      const user = {
          id: profile.id,
          source: "google",
          name: "test"
      }
      return done(null, user);
    }));
  }
}