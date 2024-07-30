import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma";
import bcrypt from "bcrypt";

export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "******"
                }
            },
            async authorize(credentials) {
                if(!credentials?.email ||!credentials?.password) {    
                    throw new Error("No credentials provided");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user) {
                    throw new Error("Invalid credentials");
                };

                const decode = await bcrypt.compare(credentials.password, user.password);
                if(!decode) {
                    throw new Error("Invalid credentials");
                };

                return {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                }
            },
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        jwt({token, user}) {
            if(!user) return token;

            return {
                ...token,
                id: user.id
            }
        },
        session({session, token}) {
            return {
               ...session,
                id: token.id
            }
        }
    }
}