import express from 'express';
import { googleOauthHandler } from '../controllers/auth.controller';

const router = express.Router();
console.log("get auth point");


router.get('/oauth/google', googleOauthHandler);


export default router;
