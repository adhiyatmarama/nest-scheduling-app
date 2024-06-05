import { IsNotEmpty, Matches } from 'class-validator';

export class CreateAppointmentDto {
  // @IsDateString()
  @Matches(
    /^[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])$/,
    {
      message: 'date must be in yyyy-mm-dd format',
    },
  )
  @IsNotEmpty()
  date: string;

  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'time should be in time format (HH:mm)',
  }) // to match HH:mm format
  @IsNotEmpty()
  time: string;
}
