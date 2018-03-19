import { sign } from "jsonwebtoken";
import { config, schema } from "../config";

// Generate an Access Token for the given User ID
export function generateAccessToken(userId) {
  // How long will the token be valid for
  const expiresIn = '1 hour';
  // Which service issued the token
  const issuer = config.get(nameof.full(schema.authentication.token.issuer, 1));
  // Which service is the token intended for
  const audience = config.get(nameof.full(schema.authentication.token.audience, 1));
  // The signing key for signing the token
  const secret = config.get(nameof.full(schema.authentication.token.secret, 1));

  const token = sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId.toString()
  });

  return token;
}