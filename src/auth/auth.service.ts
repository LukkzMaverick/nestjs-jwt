import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

const users = [
    {
        id: 1,
        username: 'user1@user.com',
        password:
            '$2b$10$oVFeiKagMtNQCSYz319zmu/9SnvjEusIO1Gen/7SxfRcKIGXrS27q',
        role: 'admin'
    },
    {
        id: 2,
        username: 'user2@user.com',
        password:
            '$2b$10$xTe0Bp0RgOpxvqDFUMFYue5vC1oFqBeZEVfSMFvGEmjecluOiwoCC',
        role: 'user'
    },
    {
        id: 3,
        username: 'user3@user.com',
        password:
            '$2b$10$5nGFy25cdtOppc2aeex7re2jgQJrwzYuSNZ5oGVbHjwtuD0sqdnqG',
        role: 'user'
    }
];
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login(username: string, password: string) {
        const user = this.validateCredentials(username, password);
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        };
        return {
            token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET
            })
        };
    }

    validateCredentials(username: string, password: string) {
        const user = users.find(
            (user) =>
                user.username === username &&
                compareSync(password, user.password)
        );
        if (user) return user;
        throw new ForbiddenException('Username or password incorrect');
    }
}
