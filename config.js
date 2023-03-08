import AWS from "aws-sdk";

//mongodb access url
export const MONGO_URL =
  "mongodb+srv://ahmadsheraz:DlBc2SYwebEkaYVN@cluster0.q2vah08.mongodb.net/DB?retryWrites=true&w=majority";
export const JWT_SECRET = "a";

//bucket access keys
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

export const S3 = new AWS.S3();
