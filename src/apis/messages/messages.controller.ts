import { Body, Controller, Query, Post, Get, Headers, Request } from '@nestjs/common';
import { MessageService } from 'src/messages/services/message/message.service';
import {Message} from 'src/models/message.model'
import { AuthService } from 'src/services/auth/auth.service';
@Controller('messages')
export class MessagesController {

    constructor(private messageService :MessageService, private authService: AuthService){}

    @Post('/send')
    public async sendMessage(@Body() message: Message, @Request() req:any) {
        console.log(req.user);
        message.user = req.user.uid;
        return await this.messageService.create(message);
    }

    @Get('/')
    public async getMessages(@Query('from') fromId: string, @Query('to') toId:string){
        return await this.messageService.findByUserId(fromId, toId);
    }

   
}
