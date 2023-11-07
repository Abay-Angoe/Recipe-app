
import { Request, Response, NextFunction } from "express";


// Validation middleware to check if full name has a space
export const validateFullName = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Full name is required.' });
  }

  // Check if the full name has a space between the first name and last name
  if (!username.includes(' ')) {
    return res.status(400).json({ error: 'Full name must contain a space between the first name and last name.' });
  }

  // Proceed to the next middleware or route handler if validation passes
  next();
}

