import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CLIENT_ID, REDIRECT_URI } from "../../config";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { code } = request.query;

  console.log(code);

  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      body: {
        code,
        client_id: CLIENT_ID,
        client_secret: process.env.client_secret,
        redirect_uri: REDIRECT_URI,
      },
      method: "POST",
    }
  );

  response.status(200).json({
    data
  });
}
