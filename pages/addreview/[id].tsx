import type { NextPage } from "next";
import { useState } from "react";
import styles from "../../styles/AddReview.module.css";

// Firebase
import { DocumentData } from "firebase/firestore/lite";

// Material UI
import { Button, Rating, TextField } from "@mui/material";

import { NODE_ENV } from "../../node-env.config";

const ratingLabels: { [index: string]: string } = {
  1: "Not good",
  2: "Could've been better",
  3: "Ok",
  4: "Good",
  5: "Great!",
};

const AddReview: NextPage = ({ book }: DocumentData) => {
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>("");
  const [hover, setHover] = useState(-1);

  const handlePostReview = async () => {
    console.log("Rating:", rating);
    console.log("Review:", review);

    // TODO: Validate that review is not empty before submitting
    // this might be redundant since we included a "Required" field down below
  };

  return (
    <div className={styles.addReviewPageContainer}>
      <div className={styles.addReviewContainer}>
        <h1>{book.title}</h1>

        <div className={styles.rating}>
          <Rating
            name="simple-controlled"
            size="large"
            value={rating}
            onChange={(_event, newRating) => {
              setRating(newRating);
            }}
            onChangeActive={(_event, newHover) => {
              setHover(newHover);
            }}
          />

          {rating !== null && (
            <span>{ratingLabels[hover !== -1 ? hover : rating]}</span>
          )}
        </div>

        <TextField
          required
          type="text"
          size="small"
          margin="dense"
          multiline
          minRows={10}
          placeholder="This was a great read! I learned a lot about tree climbing, bagpipes, and the art of underwater basket weaving. Would definitely recommend to a friend."
          onChange={(event) => setReview(event.target.value)}
        />

        {/* Optional date started */}

        {/* Optional date ended */}

        {/* Optional recent reviews section like Yelp */}

        <Button
          type="submit"
          variant="contained"
          onClick={handlePostReview}
          className={styles.postReviewButton}
        >
          Post Review
        </Button>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${NODE_ENV}/api/books`);
  const booksJSON = await res.json();
  const books: DocumentData[] = booksJSON.books;

  // Get the paths we want to pre-render based on books
  const paths = books.map((book) => ({
    params: { id: book.isbn.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`${NODE_ENV}/api/books/${params.id}`);
  const bookJSON = await res.json();
  const book = bookJSON.book;

  return {
    props: {
      book,
    },
  };
}

export default AddReview;
