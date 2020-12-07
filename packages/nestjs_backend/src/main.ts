import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import csurf from 'csurf'
import rateLimit from 'express-rate-limit'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: '*' })
    app.use(helmet())

    // @TODO add session and cookie functionality to get this working
    // app.use(csurf())
    // app.use(
    //     rateLimit({
    //         windowMs: 15 * 60 * 1000,
    //         max: 100,
    //     }),
    // )

    await app.listen(3000)
}
bootstrap()
