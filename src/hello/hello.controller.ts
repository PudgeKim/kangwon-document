import { HelloService } from './hello.service';
import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService: HelloService){}

    @Get('')
    getHello() {
        return this.helloService.getHello()
    }
}
