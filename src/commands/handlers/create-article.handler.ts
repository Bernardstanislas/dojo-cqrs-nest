import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

  execute(command: CreateArticleCommand, resolve: (value?) => void): any {
    const article = this.articleRepository.create(command.articleDto);
    resolve(this.articleRepository.save(article));
  }
}
