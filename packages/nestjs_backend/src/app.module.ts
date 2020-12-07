import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { config } from 'dotenv'

config()

import { AuthenticationModule } from './authentication/authentication.module'
import { ReviewModuleModule } from './review/review-module.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // ignoreEnvVars: process.env.NODE_ENV === 'production',
        }),
        // CacheModule.register({
        //     store: redisStore,
        //     host: 'localhost',
        //     port: 6379,
        // }),
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
