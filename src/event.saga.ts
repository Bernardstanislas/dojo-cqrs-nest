import { Injectable } from '@nestjs/common';
import { EventObservable, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleCreated } from './events/article-created.event';
import { Event } from './event.entity';
import { getRepository } from 'typeorm';
import { AddIdToCatalogCommand } from './commands/implementations/add-id-to-catalog.command';
import { Article } from './article.entity';

@Injectable()
export class EventSaga {
  eventPublished = (eventStream: EventObservable<any>): Observable<ICommand> => {
    return eventStream.ofType(ArticleCreated).pipe(map(event => {
      const storedEvent = new Event();
      storedEvent.payload = event;
      storedEvent.aggregateId = event.aggregateId;
      const {constructor} = Object.getPrototypeOf(event);
      storedEvent.className = constructor.name;
      getRepository(Event).save(storedEvent);
      return null;
    }));
  }

  eventCreated = (eventStream: EventObservable<any>): Observable<ICommand> => {
    return eventStream.ofType(ArticleCreated).pipe(map(event => {
      return new AddIdToCatalogCommand(
        'Article',
        event.aggregateId,
      );
    }));
  }
}
