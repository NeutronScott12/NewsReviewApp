import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'
import { hash, genSalt, compare } from 'bcryptjs'

import { PrismaService } from '../../../prisma.service'
import { findUser } from '../../../utlity/findUser'
import { CurrentUser } from '../../decorators/currentuser.decorator'
import { GqlAuthGuard } from '../../guards/gql-auth.guard'
import { AuthenticationResponse } from '../../models/authentication_response.model'
import { DeleteResponse } from '../../models/deleteResponse.model'
import { User } from '../../models/user.model'
import { AuthService } from '../../service/auth.service'
import { LoginInput } from '../input_types/login_input'
import { RegisterInput } from '../input_types/register_input'

@Resolver(() => User)
export class UserResolvers {
    constructor(
        private prismaService: PrismaService,
        private authService: AuthService,
    ) {}

    // @ts-ignore
    @Query((returns) => [User])
    async fetch_users() {
        const users = await this.prismaService.user.findMany()

        console.log(users)

        return users
    }

    @Mutation(() => AuthenticationResponse)
    async register(
        @Args('RegisterInput') register_input: RegisterInput,
    ): Promise<AuthenticationResponse> {
        console.log('REGISTER_INPUT', register_input)

        let passwordHash

        try {
            const salt = await genSalt(10)
            passwordHash = await hash(register_input.password, salt)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: `It fucked up Reason below \n ${error}`,
                },
                HttpStatus.FORBIDDEN,
            )
        }

        const user_input: RegisterInput = {
            name: register_input.name,
            password: passwordHash,
        }

        const user = await this.prismaService.user.create({
            data: user_input,
        })

        return {
            success: true,
            JwtToken: await this.authService.sign_payload(user),
        }
    }

    @Mutation(() => AuthenticationResponse)
    async sign_in(@Args('LoginInput') login_input: LoginInput) {
        const user = await findUser(this.prismaService, login_input.name)

        if (user && user.password) {
            const hash_password = user.password
            let matches = await compare(login_input.password, hash_password)
            if (matches) {
                return {
                    success: true,
                    JwtToken: await this.authService.sign_payload(user),
                }
            } else {
                return {
                    success: false,
                    // code: HttpStatus.FORBIDDEN,
                    JwtToken: '',
                }
            }

            return user
        } else {
            return {
                success: false,
                JwtToken: '',
            }
        }
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => DeleteResponse)
    async delete_user(@CurrentUser() user_info: User) {
        if (user_info.id) {
            await this.prismaService.user.delete({
                where: {
                    id: user_info.id,
                },
            })

            return {
                success: true,
            }
        } else {
            return {
                success: false,
            }
        }
    }
}
