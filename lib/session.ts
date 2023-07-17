/**
 * Keep all the data of the current logged user
 */
import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {

        },
        decode: async ({ secret, token }) => {

        }
    },
    theme: {
        colorScheme: 'light',
        logo: '/logo.png'
    },
    callbacks: {
        /** This function has triggered everytime that the user visits the page */
        async session({ session }) {
            const email = session?.user?.email as string;

            try {
                const data = await getUser(email) as { user?: UserProfile }
                // Multiple spreading to combine the two sessions in one
                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user
                    }
                }
                return newSession;
            } catch (error) {
                console.error('Error retrieving user data', error);
                return session;
            }
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                // Get the user of the BD if they exist
                const userExist = await getUser(user?.email as string) as { user?: UserProfile }

                // if they don't exist, create them
                if(!userExist.user) {
                    await createUser(user.name as string, user.email as string, user.image as string);
                }

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