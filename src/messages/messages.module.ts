import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MessageService } from './services/message/message.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema},
        ])
    ],
    exports: [MessageService],
    providers: [MessageService],
    
})
    
export class MessagesModule {}
