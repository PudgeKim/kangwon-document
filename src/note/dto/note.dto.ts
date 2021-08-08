import {
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SaveNoteDto {
  @IsNumberString()
  userId: string;

  @MinLength(1)
  @MaxLength(35)
  noteName: string;

  content: string;

  order: string;
}

export class GetSentencesDto {
  @IsNumberString()
  userId: string;

  @MinLength(1)
  word: string;
}
