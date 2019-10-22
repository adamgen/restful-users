import bcrypt from 'bcrypt-nodejs';
import sgMail from '@sendgrid/mail';


export function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function comparePasswords(data: string, hash: string) {
    return bcrypt.compareSync(data, hash);
}

export function isEmailString(email: string) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export function sendEmail(msg: {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html: string;
}) {
    if(!process.env.SENDGRID_API_KEY){
        throw new Error('SENDGRID_API_KEY not found');
    }
    console.log(process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail.send(msg);
}
