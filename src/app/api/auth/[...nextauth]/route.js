import dbConnect from "@/lib/dbConnect";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";

export const authOptions = {

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    // jwt authentication is by-default in next auth
    callbacks: {
        async jwt({ token, user, account }) {

            if (user) {
                token.id = user.id
            }
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },

        //next auth session mein by default 3 items hote hai name,email,image but humne id bhi dalna hai toh hum session callback mein jaake token se id nikal ke session mein dal denge
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
            }
            return session
            
        },

        // profile object will be coming github or google (based on login)
        async signIn({ user, profile }) {
            await dbConnect();  
            let dbUser = await User.findOne({ email: user.email })  
            
            if (!dbUser) {
                dbUser = await User.create({
                    name: profile.name,
                    email: profile.email,
                    profilePicture: profile.picture || "",
                    isVerified: profile.email_verified ? true : false,
                })
            }
            user.id = dbUser._id.toString();  //user ki id ko dbUser ki id ke barabar kar denge taki hum user ki id ko access kar sakein
            return true;
        }
    },

    session: {
        strategy: "jwt",  //by default session strategy database hota hai but humne jwt kar diya hai taki hum apne hisab se session ko manage kar sakein
        maxAge: 90 * 24 * 60 * 60, 
    },

    pages: {
        signIn: '/user-auth',
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }