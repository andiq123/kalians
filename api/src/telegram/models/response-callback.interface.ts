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
  checkout = 'checkout',
  notInStock = 'notInStock',
  viewProduct = 'view',
  nextPage = 'nPage',
  previousPage = 'pPage',
}
