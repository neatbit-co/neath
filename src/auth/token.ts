import { sign, verify, VerifyOptions, SignOptions } from "jsonwebtoken";
import { config, schema } from "../config";
import { User } from "../users/user";

export class TokenGenerator {
  // Which service issued the token
  static issuer = config.get(nameof.full(schema.authentication.token.issuer, 1));

  // Which service is the token intended for
  static audience = config.get(nameof.full(schema.authentication.token.audience, 1));

  // The signing key for signing the token
  static secret = config.get(nameof.full(schema.authentication.token.secret, 1));

  // How long will the token be valid for
  static expiresIn = "1 hour";

  // Generate an Access Token for the given User ID
  static generateAccessToken(user: User): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn,
      audience: this.audience,
      issuer: this.issuer,
      subject: user.id.toString()
    };

    return sign({
      email: user.email,
      email_verified: true,
      name: user.name,
      given_name: user.givenName,
      family_name: user.familyName
    }, this.secret, options);
  }

  static refreshAccessToken(token: string): string {
    const options: VerifyOptions = {
      algorithms: ["HS256"],
      ignoreExpiration: false
    }

    try {
      const payload = verify(token, this.secret, options) as any;

      delete payload.iat;
      delete payload.exp;
      delete payload.nbf;
      delete payload.jti;
  
      // The first signing converted all needed options into claims, they are already in the payload
      const signOptions: SignOptions = {
        expiresIn: this.expiresIn
      };
      
      return sign(payload, this.secret, signOptions);
    } catch (err) {
      // Access token is invalid
      return null;
    }
  }
}

export class AccessTokenResponse {
  constructor(private token: string) {}
}