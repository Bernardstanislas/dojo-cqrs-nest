import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import * as uuidv4 from 'uuid/v4';
import { ArticleCreated } from './events/article-created.event';

@Entity()
export class Article extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  content: string;

  public static createArticle(name: string, content: string): Article {
    const id = uuidv4();
    const newArticle = new Article();
    const articleCreatedEvent = new ArticleCreated({
      aggregateId: id,
      name,
      content,
    });
    newArticle.apply(articleCreatedEvent);
    return newArticle;
  }

  public onArticleCreated(event: ArticleCreated): void {
    this.id = event.aggregateId;
    this.name = event.name;
    this.content = event.content;
  }
}
