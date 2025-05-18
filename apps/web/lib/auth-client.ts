import { createAuthClient } from "better-auth/react"
export const authClient =  createAuthClient({
    baseURL: "http://localhost:3000",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})


export const { signIn, signUp, useSession } = authClient;