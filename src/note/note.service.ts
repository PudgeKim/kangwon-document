import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRepository } from './note.repository';
import { GetSentencesDto, SaveNoteDto, UpdateNoteDto } from './dto/note.dto';
import { Notes, Sentences } from './note-type';
import { Like } from 'typeorm';
import { Note } from './note.entity';

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

  async updateNote(updateNoteDto: UpdateNoteDto) {
    const noteId = updateNoteDto.noteId;
    const noteToUpdate = await this.noteRepository.findOne(noteId);

    if (!noteToUpdate) {
      return {
        success: false,
        message: `noteId ${noteId}가 존재하지 않습니다.`,
      };
    }

    if (updateNoteDto.noteName) {
      noteToUpdate.noteName = updateNoteDto.noteName;
    }
    if (updateNoteDto.content) {
      noteToUpdate.content = updateNoteDto.content;
    }

    const updatedNote: Note = await this.noteRepository.save(noteToUpdate);
    return updatedNote;
  }

  async deleteNote(noteId: string) {
    const res = await this.noteRepository.delete(noteId);
    if (res.affected == 0) {
      return {
        success: false,
        message: `noteId ${noteId}가 존재하지 않거나 삭제에 실패했습니다.`,
      };
    } else {
      return {
        success: true,
        message: '',
      };
    }
  }
}
