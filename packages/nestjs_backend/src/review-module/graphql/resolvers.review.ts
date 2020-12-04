import 'reflect-metadata'
import { Resolver, Query } from '@nestjs/graphql'

import { Review } from '../models/review.model'
import { PrismaService } from '../../prisma.service'

//@ts-ignore
@Resolver((of) => Review)
export class ReviewResolver {
    constructor(private prismaService: PrismaService) {}

    // @ts-ignore
    @Query((returns) => [Review])
    async review_posts() {
        return this.prismaService.review.findMany()
    }
}
