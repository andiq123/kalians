/* eslint-disable prettier/prettier */
export class ResponseCallback {
  id?: string;
  command: ResponseCallbackCommands;
}

export enum ResponseCallbackCommands {
  buy = 'buy',
  add = 'add',
  remove = 'remove',
  category = 'cats',
}
