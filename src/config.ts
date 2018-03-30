import * as convict from "convict";

// Define a schema
export const schema = {
    env: {
        doc: "The application environment.",
        format: ["production", "staging", "development"],
        default: "development",
        env: "NODE_ENV"
    },
    http: {
        port: {
            doc: "The port to listen on",
            default: 3000,
            env: "PORT"
        }
    },
    authentication: {
        google: {
            clientId: {
                "doc": "The Client ID from Google to use for authentication",
                "default": "",
                "env": "GOOGLE_CLIENTID"
            },
            clientSecret: {
                "doc": "The Client Secret from Google to use for authentication",
                "default": "",
                "env": "GOOGLE_CLIENTSECRET"
            }
        },
        facebook: {
            clientId: {
                "doc": "The Client ID from Facebook to use for authentication",
                "default": "",
                "env": "FACEBOOK_CLIENTID"
            },
            clientSecret: {
                "doc": "The Client Secret from Facebook to use for authentication",
                "default": "",
                "env": "FACEBOOK_CLIENTSECRET"
            }
        },
        token: {
            secret: {
                doc: "The signing key for the JWT",
                default: "mySuperSecretKey",
                env: "JWT_SIGNING_KEY"
            },
            issuer: {
                doc: "The issuer for the JWT",
                default: "neath"
            },
            audience: {
                doc: "The audience for the JWT",
                default: "neath"
            }
        }
    }
};

export const config = convict(schema);

// Load environment dependent configuration
/* var env = config.get("env");
config.loadFile(`./config/${env}.json`); */

// Perform validation
config.validate({allowed: "strict"});