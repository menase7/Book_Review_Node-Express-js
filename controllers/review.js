import review from "../models/review.js";

// Function to get a review for a book by its ID
export async function getReview(req, res) {
    try {
        const { id } = req.params;
        const bookReview = await review.findAll({
            attributes: ["review_text"],
            where: { BookId: id }
        });

        if (!bookReview.length) {
            return res.json({ message: "No review found for this book!" });
        }

        res.json({ message: "Review found for this book", bookReview });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

// Function to add or update a review for a book
export async function addReview(req, res) {
    try {
        const { user_id } = req.user;
        const book_id = req.params.id;
        const { review_text } = req.body;

        // Check if a review already exists for this user and book
        const foundReview = await review.findOne({
            where: { UserId: user_id, BookId: book_id }
        });

        if (foundReview) {
            // If a review exists, update it
            await review.update({ review_text }, { where: { UserId: user_id, BookId: book_id } });
            return res.json({ message: `Review updated successfully!` });
        }

        // If no review exists, create a new one
        await review.create({ UserId: user_id, BookId: book_id, review_text });
        res.json({ message: `Review added successfully!` });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

// Function to delete a review for a book
export async function deleteReview(req, res) {
    try {
        const { user_id } = req.user;
        const { id } = req.params;

        // Delete the review based on user and book ID
        const deletedReview = await review.destroy({
            where: { UserId: user_id, BookId: id }
        });

        if (!deletedReview) {
            return res.json({ message: "No review found for that user to delete!" });
        }

        res.json({ message: "Review deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}
