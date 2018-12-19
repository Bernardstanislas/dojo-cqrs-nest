import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/articles')
  getArticles(): ArticleDto {
    return {
      name: 'lol',
      content: 'yolo',
    };
  }
}
