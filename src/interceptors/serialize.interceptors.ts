

// import {
//     UseInterceptors,
//     NestInterceptor,
//     ExecutionContext, 
//     CallHandler
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { plainToClass } from 'class-transformer';



// export class SerializeInterceptor implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
//         //run something before a request is handled by the request handler.
//         console.log('running from the interceptor', context)

//         return next.handle().pipe(
//             map((data: any) => {
//                 //run something before the response is sent out.
//                 console.log('I am running before the response is sent out', data)
//             })
//         )
//     }
// }

import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/dto/user.dto";


export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

interface ClassConstructor{
    new (...args: any[]): {}
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor) {}
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
            

            return handler.handle().pipe(
                map((data: any) => {
                    return plainToClass(this.dto, data, {
                        excludeExtraneousValues: true
                    })
                })
            )
    }
}