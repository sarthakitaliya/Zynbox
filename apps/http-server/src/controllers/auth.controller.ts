import { Request, Response } from "express";
import axios from "axios";
import { prismaClient } from "@repo/db/client";

export const googleAuth = (req: Request, res: Response) => {
  const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/gmail.readonly",
  ].join(" ");

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  res.json({ url });
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code;
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token, expires_in } = tokenRes.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const userData = userRes.data;
    console.log("User Data:", userData);

    const {
      email,
      name,
      picture,
    }: { email: string; name: string; picture: string } = userData;
    const existingUser = await prismaClient.connectedAccount.findUnique({
      where: {
        email,
        userId: req.user.id,
      },
    });
    if (!existingUser) {
      await prismaClient.connectedAccount.create({
        data: {
          userId: req.user.id,
          name,
          email,
          image: picture,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt,
        },
      });
    }
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error("Error during Google callback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
