import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigService } from "./config.service";
import { TokenMiddleware } from "./app.middleware";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes("/bio/update");
  }
}
