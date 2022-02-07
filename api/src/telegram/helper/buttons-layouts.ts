/* eslint-disable prettier/prettier */
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { Messages } from '../enum/messages.enum';
import { ResponseCallbackCommands } from '../models/response-callback.interface';

export function show_buy_layout(id: string, text: string) {
  return [
    {
      text: Messages.Back,
      callback_data: JSON.stringify({
        command: ResponseCallbackCommands.category,
      }),
    },
    {
      text,
      callback_data: JSON.stringify({
        id: id,
        command: ResponseCallbackCommands.buy,
      }),
    },
  ];
}

export function get_checkout_layout(cartId: string) {
  return [
    {
      text: Messages.Checkout,
      callback_data: JSON.stringify({
        id: cartId,
        command: ResponseCallbackCommands.checkout,
      }),
    },
  ];
}

export function show_cartItem_layout(id: string) {
  return [
    {
      text: '+',
      callback_data: JSON.stringify({
        id: id,
        command: ResponseCallbackCommands.add,
      }),
    },
    {
      text: '-',
      callback_data: JSON.stringify({
        id: id,
        command: ResponseCallbackCommands.remove,
      }),
    },
  ];
}

export function generatePageButtons(
  pageNumber: number,
  totalPages: number,
): InlineKeyboardButton[][] {
  return [
    [
      pageNumber > 0
        ? {
            text: Messages.PreviousPage,
            callback_data: JSON.stringify({
              command: ResponseCallbackCommands.previousPage,
            }),
          }
        : { text: '-', callback_data: JSON.stringify('') },
      pageNumber < totalPages - 1
        ? {
            text: Messages.NextPage,
            callback_data: JSON.stringify({
              command: ResponseCallbackCommands.nextPage,
            }),
          }
        : { text: '-', callback_data: JSON.stringify('') },
    ],
  ];
}
