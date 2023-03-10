import app from "./app";

const APP_PORT = process.env.APP_PORT || 3000;

app.listen(APP_PORT, async () => {
  console.log(`Listening on port ${APP_PORT}`);
});
