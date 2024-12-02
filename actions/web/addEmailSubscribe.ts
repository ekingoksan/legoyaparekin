
"use server";

import { client } from "@/lib/client";

export const addEmailSubscribe = async (data: any) => {
    const email = data.get('email');

    const control = await client.subscribers.findFirst({
        where: {
            email: email
        }
    })

    if (control) {
        return {
            message: 'Bu e-posta bültenimize daha önce kayıt olmuş',
            status: 400,
            data: null
        }
    }

    const result = await client.subscribers.create({
        data: {
            email: email
        }
    })

    if (!result) {
        return {
            message: 'Bir hata oluştu',
            status: 400,
            data: null
        }
    }

    return {
        message: 'E-posta bültenimize başarıyla kayıt oldunuz',
        status: 200,
        data: result
    };
}