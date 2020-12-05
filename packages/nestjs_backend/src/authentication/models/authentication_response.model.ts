import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthenticationResponse {
    @Field()
    success: boolean

    @Field()
    JwtToken: string
}
