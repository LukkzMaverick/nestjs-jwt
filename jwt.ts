import { createHmac } from 'crypto';

const header: object = {
    algorithm: 'HS256',
    type: 'JWT'
};

const payload: object = {
    username: 'user1@user.com',
    name: 'Lucas Oliveira',
    exp: new Date().getTime()
};

const key = 'abcd123456';

const headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64');

const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64');
const signature = createHmac('sha256', key)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest();
const base64url = require('base64url');
console.log(`${headerEncoded}.${payloadEncoded}.${base64url(signature)}`);
