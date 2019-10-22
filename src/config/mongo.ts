import chalk from 'chalk';
import mongoose from 'mongoose';

const getConnectionString = () => process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/users';

export const connectToDb = async () => {
    const promise = mongoose.connect(getConnectionString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // mongoose.set('debug', true);
    return promise;
};


connectToDb()
    .then(() => {
        console.log(chalk.green('db connected'));
    })
    .catch((err) => {
        console.log(chalk.red('db connection error'), err);
    });
