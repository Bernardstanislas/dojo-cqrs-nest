import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AddIdToCatalogCommand } from '../implementations/add-id-to-catalog.command';
import { Catalog } from '../../catalog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(AddIdToCatalogCommand)
export class AddIdToCatalogHandler implements ICommandHandler<AddIdToCatalogCommand> {
  constructor(
    @InjectRepository(Catalog) private readonly catalogRepository: Repository<Catalog>,
  ) {}

  async execute(command: AddIdToCatalogCommand, resolve: (value?) => void): Promise<any> {
    let catalog = await this.catalogRepository.findOne(command.entityName);
    if (!catalog) {
      catalog = new Catalog();
      catalog.entityName = command.entityName;
      catalog.idList = [];
    }
    catalog.idList.push(command.id);

    resolve(this.catalogRepository.save(catalog));
  }
}
