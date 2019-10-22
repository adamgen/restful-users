import { Request } from "express";
import { User } from "../users/users.schema";
import { sendEmail, signToken } from "../users/users.utils";

export const postSession = async function postSession(req: Request) {
    const promise = User.findOne({ email: req.body.email });
    promise.catch(err => {
        console.log(err);
    });
    const user = await promise;
    const token = signToken({ email: user.email });

    sendEmail({
        to: user.email,
        from: 'auth@example.com',
        subject: 'Password reset',
        html: `
<h1>Your password reset</h1>
You requested to reset your password for our app, you can log in with <a href="http://${process.env.APP_URL}/users?token=${token}">this link</a> and change password once logged in.
`,
    });
}