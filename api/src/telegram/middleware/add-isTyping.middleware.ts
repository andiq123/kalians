/* eslint-disable prettier/prettier */
import { Context } from 'telegraf';

export async function addIsTyping(ctx: Context, next: any) {
  await ctx.replyWithChatAction('typing');
  try {
    await next();
  } catch (error) {
    await ctx.reply('Sa produs o eroare');
  }
}
// chat: {
//   id: 407882729,
//   first_name: 'Дынь',
//   username: 'Djokoby',
//   type: 'private'
// },
