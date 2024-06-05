import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Appointments {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const AppointmentsSchema = SchemaFactory.createForClass(Appointments);
