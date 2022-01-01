import type { NextApiResponse } from "next";

// Firebase
import firebaseConfig from "../../../firebase.config";
import { initializeApp } from "firebase/app";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";

type Book = {
  book?: DocumentData;
  message?: string;
};

export default async function handler(
  { query: { id: isbn } }: any,
  res: NextApiResponse<Book>
) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const booksRef = collection(db, "book");
    const booksSnapshot = await getDocs(booksRef);
    const booksList = booksSnapshot.docs.map((doc) => doc.data());
    const book = booksList.find((book) => book.isbn.toString() === isbn);

    if (book !== undefined) {
      res.status(200).json({ book: book });
    } else {
      res
        .status(404)
        .json({ message: `Book with ISBN: ${isbn} could not be retrieved.` });
    }
  } catch (e) {
    res.status(400).end();
  }
}
