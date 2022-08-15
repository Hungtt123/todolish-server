import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Message{
    @Prop()
    content: string;

    @Prop()
    user: string;

    @Prop()
    createAt: number;

    @Prop()
    toUser: string;
}
export type MessageDocumnet = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);