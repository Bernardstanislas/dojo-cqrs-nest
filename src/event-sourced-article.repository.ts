import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { ArticleEvents } from './events/namespace';

@Injectable()
export class EventSourcedArticleRepository {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
  ) {}

  public async findById(aggregateId: Article['id']): Promise<Article> {
    const articleHistory: Event[] = await this.eventRepository.find({ where: { aggregateId } });
    const articleHistoryEvents = articleHistory.map(this.recreateEvent);

    const article = new Article();
    article.loadFromHistory(articleHistoryEvents);
    return article;
  }

  private recreateEvent(event: Event) {
    return new (ArticleEvents as any)[event.className](event.payload);
  }
}
