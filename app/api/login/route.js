import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/jwt";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";

export async function POST(req,res){
    console.log('work')
    try {
        const formData = await req.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            console.log("E-Posta ve şifre alanlarını doldurunuz.");
            return NextResponse.json({
                Message: "E-Posta ve şifre alanlarını doldurunuz.",
                status: 400
            });
        }

        const user = await db.users.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            return NextResponse.json({
                Message: "E-Posta adresiniz hatalı.",
                status: 404
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({
                Message: "Şifrenizi hatalı girdiniz.",
                status: 401
            });
        }


        const token = await new SignJWT({
            email: user.email,
            id: user.id
        })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(getJwtSecretKey());

        cookies().set({
            name: "user",
            value: token,
            maxAge: 60 * 60 * 24,
            expires: new Date(Date.now() + 60 * 60 * 23),
            path: "/",
            httpOnly: true
        })

        return NextResponse.json({
            Message: "Giriş başarılı.",
            status: 200
        });

    } catch (error) {
        console.log("Error on login", error);
        return NextResponse.error({
            Message: "Bir hata oluştu. Lütfen tekrar deneyin.",
            status: 500
        });
    }
}