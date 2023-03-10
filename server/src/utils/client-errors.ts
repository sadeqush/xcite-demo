import { Response } from "express";

export const sendMalformedRequestError = (res: Response) => {
  return res.status(400).json({ error_message: "Malformed Request Body" });
};

export const sendExceptionError = (res: Response) => {
  return res.status(500).json({ error_message: "Something went wrong" });
};
