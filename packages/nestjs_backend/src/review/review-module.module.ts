import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { ReviewResolver } from './graphql/resolvers.review'

@Module({
    providers: [PrismaService, ReviewResolver],
})
export class ReviewModuleModule {}
