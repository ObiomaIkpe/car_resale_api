import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        // return 'hi there'
        const request = context.switchToHttp().getRequest();
        console.log(request.session.userId)
        return request.CurrentUser
    }
)