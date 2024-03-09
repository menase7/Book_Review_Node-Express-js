import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import * as reviewControllers from "../controllers/review.js";

const router = Router();

router.delete("/books/:id/reviews", authenticate, reviewControllers.deleteReview);
router.put("/books/:id/reviews", authenticate, reviewControllers.addReview);
router.get("/books/:id/reviews", reviewControllers.getReview);


export default router;