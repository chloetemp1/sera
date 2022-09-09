import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CLIENT_ID, REDIRECT_URI } from "../../config";
import queryString from "query-string";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { code } = request.query;

  try {
    const body = {
      code,
      client_id: CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
    };

    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      { headers: { Accept: "application/json" } }
    );

    response.status(200).json({
      data,
    });
  } catch (err) {
    console.error(err);
  }
}