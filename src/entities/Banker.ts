import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { Client } from "./Client";
import { User } from "./utils/User";

@Entity("banker")
export class Banker extends User {
  @Column({
    unique: true,
    length: 10,
  })
  employee_number: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  last_updated: Date;

  @ManyToMany(() => Client)
  @JoinTable({
    name: "bankers_clients",
    joinColumn: { name: "banker", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "client",
      referencedColumnName: "id",
    },
  })
  clients: Client[];
}
