const { PORT = '8080', SECRET_KEY = '' } = process.env;
export const config = {
  port: PORT,
  secret: SECRET_KEY,
};
