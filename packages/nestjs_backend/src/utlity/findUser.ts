import { PrismaService } from '../prisma.service'

export const findUser = async (prismaService: PrismaService, name: string) => {
    const user = await prismaService.user.findUnique({ where: { name } })

    if (user) {
        return user
    }

    return null
}
