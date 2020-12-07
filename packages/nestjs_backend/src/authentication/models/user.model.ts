import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Review } from '../../review/models/review.model'

@ObjectType()
export class User {
    @Field(() => Int)
    id: number

    @Field()
    name: string

    password?: string

    @Field(() => [Review])
    reviews: Review[]

    @Field()
    createdAt: Date
}
