import type { NextPage } from "next";
import Image from "next/image";

// Firebase
import { DocumentData } from "firebase/firestore/lite";

import { NODE_ENV } from "../../node-env.config";

const Book: NextPage = ({ book }: DocumentData) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <ul>
        <li>Author: {book.author}</li>
        <li>Description: {book.description}</li>
        <li>Edition: {book.edition}</li>
        <li>
          Genres:{" "}
          {book.genres.map((genre: string, key: number) => {
            return <span key={key}>{genre} </span>;
          })}
        </li>
        <li>ISBN: {book.isbn}</li>
        <li>Pages: {book.pages}</li>
        <li>Publisher: {book.publisher}</li>
        <li>Publication Year: {book.publication_year}</li>
        <li>
          Reviews:{" "}
          {book.reviews.map((reviewId: string, key: number) => {
            return <span key={key}>{reviewId} </span>;
          })}
        </li>
        <Image
          src={book.image_url}
          alt={"Book cover for " + book.title}
          width={350}
          height={500}
        />
      </ul>
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

export default Book;
