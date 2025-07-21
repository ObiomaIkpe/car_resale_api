import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    async Intercept(context: ExecutionContext, handler: CallHandler){
        const request = context.switchToHttp().getRequest()
        const {userId} = request.session || {};

        if(userId){
            const user = await this.usersService.findOne(userId);
            
            request.CurrentUser = user;
        }

        return handler.handle();
}
}

