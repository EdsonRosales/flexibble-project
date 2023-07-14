import NextAuth from "next-auth";

import { authOptions } from "@/lib/session";

const handler = NextAuth(authOptions);

/**
 * This allows me to make GET & POST request using next auth
 */
export { handler as GET, handler as POST };