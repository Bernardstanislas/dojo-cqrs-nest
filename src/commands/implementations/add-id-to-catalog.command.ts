import { ICommand } from '@nestjs/cqrs';

export class AddIdToCatalogCommand implements ICommand {
  constructor(
    readonly entityName: string,
    readonly id: string,
  ) {}
}
