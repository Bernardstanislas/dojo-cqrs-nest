import { Injectable } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/article-created.command';

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
    await this.commandBus.execute(createArticleCommand);
    const article = this.articleRepository.create(articleDto);
    return this.articleRepository.save(article);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getArticle(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }
}
