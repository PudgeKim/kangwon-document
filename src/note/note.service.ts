import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRepository } from './note.repository';
import { SaveNoteDto } from './dto/note.dto';
import { Notes } from './note-type';
import { Like } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}

  saveNote(saveNoteDto: SaveNoteDto): Promise<void> {
    return this.noteRepository.saveNote(saveNoteDto);
  }

  async getNotesByOrder(userId: string): Promise<Notes> {
    const notes = await this.noteRepository.find({
      where: {
        userId: userId,
      },

      order: {
        order: 'ASC',
      },
    });

    return {
      notes: notes,
    };
  }

  async getRecommendedSentences(word: string): Promise<String[]> {
    const notes = await this.noteRepository.find({
      where: {
        content: Like(`%${word}%`),
      },
      take: 5,
    });

    const sentences = notes.map((note) => {
      return note.content;
    });

    return sentences;
  }
}
