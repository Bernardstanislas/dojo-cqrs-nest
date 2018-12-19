import { Injectable } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async storeArticle(articleDto: ArticleDto): Promise<Article> {
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
