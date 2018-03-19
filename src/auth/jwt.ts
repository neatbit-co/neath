import * as passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config, schema } from "../config";

export const useJwt = () => {
    const jwtOptions = {
        // Get the JWT from the "Authorization" header.
        // By default this looks for a "JWT " prefix
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // The secret that was used to sign the JWT
        secretOrKey: config.get(nameof.full(schema.authentication.token.secret, 1)),
        // The issuer stored in the JWT
        issuer: config.get(nameof.full(schema.authentication.token.issuer, 1)),
        // The audience stored in the JWT
        audience: config.get(nameof.full(schema.authentication.token.audience, 1))
    };
    
    passport.use(new Strategy(jwtOptions, (payload, done) => {
        console.log(`Authenticating user ID ${payload.sub}`)
        /* const user = users.getUserById(parseInt(payload.sub));
        if (user) {
            return done(null, user, payload);
        } */
        return done(null, payload);
    }));
}