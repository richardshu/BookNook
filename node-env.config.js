export const NODE_ENV =
  process.env.NODE_ENV == "production"
    ? "https://booknook.vercel.app/"
    : "http://localhost:3000";
