import { User } from "./users.schema";
import { hashPassword, isEmailString, sendEmail, signToken, verifyToken, comparePasswords } from "./users.utils";
import { Request } from "express";

export const getUsers = async function getUsers(req: Request) {
    if (!req.isAuthenticated()) {
        return false;
    }

    const result = await User.findById(req.user).catch(a => a);
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

    const token = signToken({ email: user.email });

    sendEmail({
        to: user.email,
        from: 'auth@example.com',
        subject: 'Please validate your email',
        // text: 'and easy to do anywhere, even with Node.js',
        html: `
<h1>Hi!</h1>

You've registered as a user to our system, please approve by visiting <a href="http://${process.env.APP_URL}/users?token=${token}">this link</a>
`,
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        });


    return newUser;
}

export const putUsers = async function putUsers(req: Request) {
    const { email, password, oldPassword } = req.body;
    const promise = User.findById(req.user);
    const user = await promise;

    if (isEmailString(email)) {
        user.email = email;
    }

    if (password && oldPassword && comparePasswords(oldPassword, user.password)) {
        user.password = hashPassword(password);
    }

    await user.update(user);
    return user;
}

export const deleteUsers = async function deleteUsers(req: Request) {
    if (!req.isAuthenticated()) {
        throw new Error('User is not authenticated');
    }
    const user = await User.findById(req.user);
    if (user.email !== req.query.email) {
        throw new Error('unauthorized request');
    }

    return await user.remove();
}

export const validateEmailByToken = async function validateEmailByToken(token: string) {
    if (!token) {
        return false;
    }

    const decoded = verifyToken(token);
    if (typeof decoded !== 'object') {
        throw new Error('Token is not valid');
    }
    const { email } = (decoded as any);

    if (typeof email !== 'string' || !isEmailString(email)) {
        throw new Error('The token content does not have a valid email');
    }

    const promise = User.findOne({ email });
    const user = await promise;
    promise.catch(err => {
        console.log(err);
    });
    await user.update({ emailValidated: true });
    return user;
}
