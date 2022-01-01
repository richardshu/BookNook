import type { NextApiRequest, NextApiResponse } from "next";

// Firebase
import firebaseConfig from "../../../firebase.config";
import { initializeApp } from "firebase/app";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";

type Books = {
  books?: DocumentData[];
  message?: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Books>
) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const booksRef = collection(db, "book");
    const booksSnapshot = await getDocs(booksRef);
    const booksList = booksSnapshot.docs.map((doc) => doc.data());

    if (booksList.length > 0) {
      res.status(200).json({ books: booksList });
    } else {
      res.status(404).json({ message: `Books could not be retrieved.` });
    }
  } catch (e) {
    res.status(400).end();
  }
}
