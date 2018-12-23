import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './article.entity';
import { CQRSModule } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { EventBus } from '@nestjs/cqrs';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { ModuleRef } from '@nestjs/core';
import { EventSaga } from './event.saga';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'stan',
      password: '',
      database: 'dojocqrs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Article]),
    CQRSModule,
  ],
  controllers: [AppController],
  providers: [AppService, CreateArticleHandler, EventSaga],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly moduleRef: ModuleRef,
    private readonly eventSaga: EventSaga,
  ) {}

  onModuleInit(): any {
    this.commandBus.setModuleRef(this.moduleRef)
    this.commandBus.register([CreateArticleHandler]);
    this.eventBus.combineSagas([this.eventSaga.eventPublished]);
  }
}
