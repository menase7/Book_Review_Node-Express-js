import { Router } from "express";
import * as bookControllers from "../controllers/book.js";

const router = Router();

router.get("/books", bookControllers.getAllBooks);
router.post("/books/byTitle", bookControllers.getBooksByTitle);
router.post("/books/byISBN", bookControllers.getBooksByISBN);
router.post("/books", bookControllers.addBook);
router.post("/books/byAuthor", bookControllers.getBooksByAuthor);



export default router;