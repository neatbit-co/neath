// Import only what we need from express
import { Router, Request, Response } from "express";
import { authenticate } from "passport";
import { TokenGenerator, AccessTokenResponse } from "./token";
import Logger from "../logger";

// Assign router to the express.Router() instance
const router: Router = Router();

router.get('/secure',
    // This request must be authenticated using a JWT, or else we will fail
    authenticate(['jwt'], { session: false }),
    (req, res) => {
        res.send('Secure response from ' + JSON.stringify(req.user));
    }
);

/**
 * Refreshes access token.
 * 
 * @returns New access token with extended expiration time.
 */
router.post("/tokens", (req: Request, res: Response) => {
    let token = req.query.token;
    const newToken = TokenGenerator.refreshAccessToken(token);
    if (!newToken) {
        Logger.warn("Refreshing access token failed: token could not be validated");
        res.status(400).send("Invalid access token");
    } else {
        res.send(new AccessTokenResponse(newToken));
    }
})

// Export the express.Router() instance to be used by server.ts
export const AuthController: Router = router;