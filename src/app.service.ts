import { Injectable } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/create-article.command';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    private readonly commandBus: CommandBus,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async storeArticle(articleDto: ArticleDto): Promise<Article> {
    const createArticleCommand = new CreateArticleCommand(articleDto);
    return this.commandBus.execute(createArticleCommand);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getArticle(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }
}
