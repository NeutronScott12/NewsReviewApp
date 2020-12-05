import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { AuthenticationModule } from './authentication/authentication.module'
import { ReviewModuleModule } from './review/review-module.module'

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            // autoSchemaFile: 'schema.gql',
            // sortSchema: true,
        }),
        AuthenticationModule,
        ReviewModuleModule,
    ],
    controllers: [],
    // providers: [PrismaService],
})
export class AppModule {}
