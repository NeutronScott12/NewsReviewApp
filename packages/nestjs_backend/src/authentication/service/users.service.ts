import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async findUser(name: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: { name },
        })

        if (user) {
            return user
        }

        return null
    }
}
