import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './article.dto';
import { Article } from './article.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('articles')
  getArticles(): Promise<ArticleDto[]> {
    return this.appService.getAllArticles();
  }

  @Post('articles')
  async createArticle(@Body() createArticleDto: ArticleDto): Promise<ArticleDto> {
    return await this.appService.storeArticle(createArticleDto);
  }

  @Get('articles/:id')
  async getArticle(@Param() params): Promise<ArticleDto> {
    const id = params.id;
    return this.appService.getArticle(id);
  }
}
