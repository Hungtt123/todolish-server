import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MessagesController } from './apis/messages/messages.controller';
import { AuthService } from './services/auth/auth.service';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:123@cluster0.m62otsg.mongodb.net/?retryWrites=true&w=majority"),
    MessagesModule
  ],
  controllers: [AppController, MessagesController],
  providers: [AppService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
