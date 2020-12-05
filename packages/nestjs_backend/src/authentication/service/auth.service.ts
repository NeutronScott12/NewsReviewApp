import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthenticationResponse } from '../models/authentication_response.model'
import { UserService } from './users.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(
        name: string,
        password: string,
    ): Promise<AuthenticationResponse> {
        const user = await this.userService.findUser(name)

        if (user && user.password === password) {
            return {
                success: true,
                JwtToken: '',
            }
        } else {
            return {
                success: false,
                JwtToken: '',
            }
        }
    }

    async sign_payload(user: { name: string; id: any }) {
        const payload = { name: user.name, sub: user.id }

        return this.jwtService.sign(payload)
    }
}
