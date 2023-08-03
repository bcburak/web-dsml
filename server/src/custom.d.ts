declare namespace Express {
  export interface Request {
    userId?: string; // Modify the type as per your actual userId type in the MongoDB table
  }
}
