import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Catalog {
  @PrimaryColumn()
  entityName: string;

  @Column('json')
  idList: string;
}
