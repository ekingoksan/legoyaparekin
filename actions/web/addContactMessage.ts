
"use server";

import { client } from "@/lib/client";

export const addContactMessage = async (data: any) => {
    const email = data.get('email');
    const phone = data.get('phone');
    const name_surname = data.get('name_surname');
    const message = data.get('message');


    const result = await client.contactMessage.create({
        data: {
            email: email,
            phone: phone,
            name_surname: name_surname,
            message: message
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
        message: 'Mesajınız başarıyla gönderildi',
        status: 200,
        data: result
    };
}