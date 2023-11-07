import { transporter } from "../config/nodemailer.transport";
import { MailOption } from "../type/mail.option.type";

export const sendEmail = async (mailOption : MailOption | object) => {
    try {
       return await transporter.sendMail(mailOption);
       
    } catch (error) {
        throw error;
    }
    } ;