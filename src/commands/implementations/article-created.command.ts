import { ICommand } from '@nestjs/cqrs';
import { ArticleDto } from '../../article.dto';

export class CreateArticleCommand implements ICommand {
  constructor(public readonly articleDto: ArticleDto) {}
}
