import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetSentencesDto, SaveNoteDto, UpdateNoteDto } from './dto/note.dto';
import { NoteService } from './note.service';
import { Notes, Sentences } from './note-type';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post('/')
  saveNote(@Body() saveNoteDto: SaveNoteDto): Promise<void> {
    return this.noteService.saveNote(saveNoteDto);
  }

  @Get('/:userId')
  getNotesByOrder(@Param('userId') userId: string): Promise<Notes> {
    return this.noteService.getNotesByOrder(userId);
  }

  @Post('/get-sentences/')
  getRecommendedSentences(
    @Body() getSentencesDto: GetSentencesDto,
  ): Promise<Sentences> {
    return this.noteService.getRecommendedSentences(getSentencesDto);
  }

  @Patch('/')
  updateNote(@Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.updateNote(updateNoteDto);
  }

  @Delete('/:noteId')
  deleteNote(@Param('noteId') noteId: string) {
    return this.noteService.deleteNote(noteId);
  }
}
