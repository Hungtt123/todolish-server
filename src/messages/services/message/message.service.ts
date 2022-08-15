import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocumnet } from 'src/schemas/message.schema';
import {Model} from 'mongoose';
import { MessagesModule } from 'src/messages/messages.module';
import {Message as MessageModel} from 'src/models/message.model'
@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocumnet>){}
    
   async create(message: MessageModel){
    message.createAt = Date.now();
    let createMessage = new this.messageModel(message);
    await createMessage.save();
   }
   async findAll() {
    return await this.messageModel.find().exec();
   }
   async findByUserId(fromUserId: string, toUserId: string) {
    return await this.messageModel.find({$or:[{user: fromUserId, toUser: toUserId}, {user: toUserId, toUser: fromUserId}]}).exec();
   }

   
}
