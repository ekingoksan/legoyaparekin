"use server"

import { db } from "./db";
import NodeMailler from "nodemailer";

const sendMail = async (mailAddress, mailSubject, mailText, mailHeader) => {
    try {
        const toMail = mailAddress
        const subject = mailSubject
        const text = mailText

        let senderMail = process.env.EMAIL_USER;
        let senderPass = process.env.EMAIL_PASS;
        let senderHost = process.env.EMAIL_HOST;
        let senderPort = process.env.EMAIL_PORT;
        let senderSecure = process.env.EMAIL_SECURE;

        const mailSettings = await db.emailSettings.findFirst({
            where: {
                id: 1
            }
        })

        if(mailSettings && mailSettings.is_using){
            senderMail = mailSettings.user;
            senderPass = mailSettings.pass;
            senderHost = mailSettings.host;
            senderPort = mailSettings.port;
            senderSecure = mailSettings.secure;
        }

        const transporter = NodeMailler.createTransport({
            host: senderHost,
            port: senderPort,
            secure: senderSecure,
            auth: {
                user: senderMail,
                pass: senderPass
            }
        });

        const mailOptions = {
            from: `${mailHeader} <${sendMail}>`,
            to: toMail,
            subject: subject,
            text: text
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("SEND_MAIL_ERROR =>", error);
    }
}

export default sendMail;