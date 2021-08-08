import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRepository } from './note.repository';
import { GetSentencesDto, SaveNoteDto } from './dto/note.dto';
import { Notes, Sentences } from './note-type';
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

  async getRecommendedSentences(
    getSentencesDto: GetSentencesDto,
  ): Promise<Sentences> {
    const { userId, word } = getSentencesDto;
    const notes = await this.noteRepository.find({
      where: {
        userId: userId,
        content: Like(`%${word}%`),
      },
      take: 5,
    });

    const sentences = notes.map((note) => {
      return note.content;
    });

    return { sentences: sentences };
  }
}
