import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './role.decorator';
import { RoleGuard } from './role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    login(@Body() body) {
        return this.authService.login(body.username, body.password);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    @Role('user')
    test(@Req() req) {
        console.log(req.user);
        return { username: req.user.username };
    }
}
