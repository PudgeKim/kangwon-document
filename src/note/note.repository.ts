import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Note } from './note.entity';
import { SaveNoteDto } from './dto/note.dto';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  async saveNote(saveNoteDto: SaveNoteDto): Promise<void> {
    const now = new Date().toLocaleString();

    const { userId, noteName, content, order } = saveNoteDto;

    const note = this.create({
      userId: userId,
      noteName: noteName,
      content: content,
      order: order,
      modifiedAt: now,
    });

    try {
      await this.save(note);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
