/* eslint-disable prettier/prettier */
import { Context } from 'telegraf';

export async function addIsTyping(ctx: Context, next: any) {
  await ctx.replyWithChatAction('typing');
  await next();
}
// chat: {
//   id: 407882729,
//   first_name: 'Дынь',
//   username: 'Djokoby',
//   type: 'private'
// },
