import { Injectable } from '@nestjs/common';
import { ArticleDto } from './article.dto';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { EventSourcedArticleRepository  } from './event-sourced-article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/create-article.command';
import { Catalog } from './catalog.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Catalog) private readonly catalogRepository: Repository<Catalog>,
    private readonly commandBus: CommandBus,
    private readonly eventSourcedArticleRepository: EventSourcedArticleRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async storeArticle(articleDto: ArticleDto): Promise<Article> {
    const createArticleCommand = new CreateArticleCommand(articleDto);
    return this.commandBus.execute(createArticleCommand);
  }

  async getAllArticles(): Promise<Article[]> {
    const articleCatalog = await this.catalogRepository.findOne('Article');
    if (!articleCatalog) {
      return [];
    }
    return Promise.all(
      articleCatalog.idList.map(
        (id: string) => this.eventSourcedArticleRepository.findById(id),
      ),
    );
  }

  async getArticle(id: string): Promise<Article> {
    return this.eventSourcedArticleRepository.findById(id);
  }
}
