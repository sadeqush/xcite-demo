import app from "./app";
import { prisma } from "./prisma";

const APP_PORT = process.env.APP_PORT || 3000;

app.listen(APP_PORT, async () => {
  console.log(`Listening on port ${APP_PORT}`);

  try {
    await prisma.$connect();
    console.log("Successfully connected to Database.");
  } catch {
    console.error("Error connecting to Database.");
    process.exit();
  }
});
