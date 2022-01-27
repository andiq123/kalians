/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.username;
  },
);
