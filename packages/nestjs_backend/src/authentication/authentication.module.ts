import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { PrismaService } from '../prisma.service'
import { JwtConstants } from '../utlity/constants'
import { UserResolvers } from './graphql/resolvers/resolvers.user'
import { JwtStrategy } from './passport/jwt.strategy'
import { LocalStrategy } from './passport/local.strategy'
import { AuthService } from './service/auth.service'
import { UserService } from './service/users.service'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: JwtConstants.secret,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [
        AuthService,
        UserService,
        PrismaService,
        UserResolvers,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [UserService],
})
export class AuthenticationModule {}
