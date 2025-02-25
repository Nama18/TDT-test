import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number; // ID artikel yang dikomentari

  @Column()
  userId: number; // ID pengguna yang memberikan komentar

  @Column('text')
  content: string; // Konten komentar
}