import { IsString, MaxLength, MinLength } from 'class-validator';

export class SaveNoteDto {
  @IsString()
  userId: string;

  @MinLength(1)
  @MaxLength(35)
  noteName: string;

  content: string;

  order: string;
}
