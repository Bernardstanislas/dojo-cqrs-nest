import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { Article } from '../../article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  execute(command: CreateArticleCommand, resolve: (value?) => void): any {
    let article = Article.createArticle(command.articleDto.name, command.articleDto.content);
    article = this.publisher.mergeObjectContext(article);
    article.commit();
    resolve(article);
  }
}
