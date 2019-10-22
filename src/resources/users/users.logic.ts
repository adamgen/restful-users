import { User } from "./users.schema";
import { hashPassword, isEmailString, sendEmail } from "./users.utils";

export const getUsers = async function getUsers() {
    const result = await User.find().catch(a => a);
    return result;
}

export const postUsers = async function postUsers(user: any) {
    if (typeof user.password !== 'string') {
        throw new Error('Password not provided');
    }
    if (typeof user.email !== 'string') {
        throw new Error('Email not provided');
    }
    if (!isEmailString(user.email)) {
        throw new Error('Email is not valid');
    }

    const existingUser = await User.find({ email: user.email });
    if (existingUser.length > 0) {
        throw new Error('User with given email exists');
    }

    const password = hashPassword(user.password);

    const newUser = await User.create({
        email: user.email,
        password,
    });


    sendEmail({
        to: user.email,
        from: 'auth@example.com',
        subject: 'Please validate your email',
        // text: 'and easy to do anywhere, even with Node.js',
        html: `
<h1>Hi!</h1>

You've registered as a user to our system, please approve by visiting <a href="">this link</a>
`,
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        });


    return { newUser };
}
