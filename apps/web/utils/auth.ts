import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "@repo/db/client";

export const auth = betterAuth({
    database: prismaAdapter(prismaClient,{
        provider:"postgresql"
    }),
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
            scope: ["email", "profile"],
            accessType: "offline",
            prompt: "consent", 
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    session:{
        disableSessionRefresh: false,
    },
});
