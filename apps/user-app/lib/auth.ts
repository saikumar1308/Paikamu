import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                number:{label:"Phone Number", type:"text", placeholder:"123456"},
                password:{label:"Password",type:"password", placeholder:"******"}
            },
            async authorize(credentials: any) {
                const hashedPassword = await bcrypt.hash(credentials.password,10);
                const existingUser = await db.user.findFirst({
                    where:{
                        number:credentials.number
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password,existingUser.password);
                    if(passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }

                try {
                    const user = await db.user.create({
                        data:{
                            number:credentials.number,
                            password:hashedPassword
                        }
                    });
                    return {
                        id:user.id.toString(),
                        name:user.name,
                        email:user.number
                    }
                } catch (error) {
                    console.log(error);
                }

                return null
            }
        })
    ],
    secret:process.env.JWT_SECRET || "sai",
    callbacks: {
        async session({token,session}: any){
            session.user.id = token.sub
            return session
        }
    }
}