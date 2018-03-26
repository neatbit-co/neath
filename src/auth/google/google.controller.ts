// Import only what we need from express
import { Router, Request, Response } from "express";
import { authenticate } from "passport";
import { TokenGenerator } from "../token";
import authenticatedHtml from "../static/authenticated.html";
import * as Handlebars from "handlebars";

// Assign router to the express.Router() instance
const router: Router = Router();
const authenticatedHtmlTemplate = Handlebars.compile(authenticatedHtml);

const generateUserToken = (req: Request, res: Response) => {
    const accessToken = TokenGenerator.generateAccessToken(req.user as any);
    const renderedView = authenticatedHtmlTemplate({
        token: accessToken
    });
    
    res.send(renderedView);
  }

router.get('/start',
    authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));

router.get('/redirect',
  authenticate('google', { session: false }),
  generateUserToken);

// Export the express.Router() instance to be used by server.ts
export const GoogleController: Router = router;