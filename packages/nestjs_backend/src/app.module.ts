import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { ReviewModuleModule } from './review-module/review-module.module'

@Module({
    imports: [
        ReviewModuleModule,
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            // autoSchemaFile: 'schema.gql',
            // sortSchema: true,
        }),
    ],
    controllers: [],
    // providers: [PrismaService],
})
export class AppModule {}
