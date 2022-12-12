import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Banker } from "./Banker";
import { Transaction } from "./Transaction";
import { User } from "./utils/User";

@Entity("client")
export class Client extends User {
  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({
    default: true,
    name: "active",
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
  };

  @Column({
    type: "simple-array",
    default: [],
  })
  family_member: string[];

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  last_updated: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker) bankers: Banker[];
}
