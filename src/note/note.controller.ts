import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaveNoteDto } from './dto/note.dto';
import { NoteService } from './note.service';
import { Notes } from './note-type';

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
}
