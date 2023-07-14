/**
 * Keep all the data of the current logged user
 */
import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    // jwt: {
    //     encode: ({ secret, token }) => {

    //     },
    //     decode: async ({ secret, token }) => {

    //     }
    // },
    theme: {
        colorScheme: 'light',
        logo: '/logo.png'
    },
    callbacks: {
        /** This function has triggered everytime that the user visits the page */
        async session({ session }) {
            return session;
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                // Get the user of the BD if they exist

                // if they don't exist, create them

                // finally return the user
                return true
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;

    return session;
}