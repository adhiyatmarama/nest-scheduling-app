import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { DateTime, Interval } from 'luxon';
import {
  APPOINTMENT_DURATION,
  OPERATION_END_TIME,
  MAX_SLOT,
  OPERATION_START_TIME,
} from 'src/config';
import { InjectModel } from '@nestjs/mongoose';
import { Appointments } from 'src/schemas/appointments.schema';
import { Model, QueryOptions } from 'mongoose';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointments.name)
    private appointmentModel: Model<Appointments>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    if (this.isDateOnWeekend(createAppointmentDto.date))
      throw new BadRequestException('Date is on weekend');

    // Get appointment on same date and time
    const appointmentsOnDateAndTime = await this.findAll({
      date: createAppointmentDto.date,
      time: createAppointmentDto.time,
    });

    // return error when slot is not available
    if (
      appointmentsOnDateAndTime.length > 0 &&
      appointmentsOnDateAndTime.length == MAX_SLOT
    ) {
      throw new BadRequestException('Slot is not available');
    }

    const newAppointment = new this.appointmentModel(createAppointmentDto);
    await newAppointment.save();

    return {
      message: 'Appointment successfully created',
      appointment: createAppointmentDto,
    };
  }

  async findAll(options?: QueryOptions): Promise<Appointments[]> {
    const appointments = await this.appointmentModel.find(options).exec();
    return appointments;
  }

  async findAvailableSlot(date: string) {
    if (this.isDateOnWeekend(date))
      throw new BadRequestException('Date is on weekend');

    const startDateTime = DateTime.fromISO(
      `${date}T${OPERATION_START_TIME}`,
    ).toLocal();

    const endDateTime = DateTime.fromISO(
      `${date}T${OPERATION_END_TIME}`,
    ).toLocal();

    const interval = Interval.fromDateTimes(
      startDateTime,
      endDateTime,
    ).length();

    const appointmentsOnDate = await this.findAll({ date });

    const slots = [];
    // interval is in ms while duration is in minutes, need multipy with 60 and 1000 on duration
    // assume the next schedule/time starts immediately after previous schedule ends
    for (let i = 0; i < interval / (APPOINTMENT_DURATION * 60 * 1000); i++) {
      const time = startDateTime
        .plus({ minutes: APPOINTMENT_DURATION * i })
        .toFormat('HH:mm');

      const takenSlotAtTime = appointmentsOnDate.filter(
        (appointment) => appointment.time === time,
      );

      slots.push({
        date,
        time,
        available_slots:
          takenSlotAtTime.length > 0
            ? MAX_SLOT - takenSlotAtTime.length
            : MAX_SLOT,
      });
    }

    return slots;
  }

  isDateOnWeekend(date: string): boolean {
    const weekday = DateTime.fromISO(date).toLocal().weekday; // to get day of the week

    return [6, 7].includes(weekday); // 6, 7 are represents Saturday and Sunday
  }
}
