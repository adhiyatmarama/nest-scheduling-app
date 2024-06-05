import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Appointments,
  AppointmentsSchema,
} from 'src/schemas/appointments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointments.name, schema: AppointmentsSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
