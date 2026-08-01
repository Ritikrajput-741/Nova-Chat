import express from "express";
import { rateLimiter } from "../config/rate_limitter.js";
import {
  allOtherUser,
  userLogin,
  userLogout,
  userRegister,
} from "../controller/user_Controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", rateLimiter, userRegister);
router.post("/login", rateLimiter, userLogin);
router.get("/logout", rateLimiter, userLogout);
router.get("/all-other-user", isAuth, allOtherUser);

export default router;
