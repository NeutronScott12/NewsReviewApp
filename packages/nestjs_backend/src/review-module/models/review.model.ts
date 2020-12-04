import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Review {
    @Field(() => Int)
    id: number

    @Field()
    title: string

    // @Field()
    // createdAt: number
}
