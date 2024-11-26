import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  isDaysMenu: boolean;

  @Column({ default: false })
  soldOut: boolean;
}
