/* eslint-disable prettier/prettier */
import { Update, Ctx, Start, Help, On, Hears, Command } from 'nestjs-telegraf';
import { ProductsViewDto } from 'src/products/dto/products-view.dto';
import { CategoryService } from 'src/products/services/category.service';
import { ProductsService } from 'src/products/services/products.service';
import { Context } from 'telegraf';
import { CartItem } from './models/cart.interface';

import {
  ResponseCallback,
  ResponseCallbackCommands,
} from './models/response-callback.interface';
import { CartService } from './services/cart.services';

@Update()
export class AppUpdate {
  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private cartService: CartService,
  ) {}

  @Start()
  async start(@Ctx() ctx: any) {
    await ctx.reply('Iura cautati de treaba nu checkani botul');
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply('Foloseste /products pentru a vedea produsele');
    await ctx.reply('Foloseste /cart pentru a vedea cosul');
  }

  @On('callback_query')
  async on(@Ctx() ctx: any) {
    // get the message
    const data: ResponseCallback = JSON.parse(ctx.callbackQuery.data);

    switch (data.command) {
      case ResponseCallbackCommands.category: {
        await this.handleShowProductsByCategory(ctx, data);
        break;
      }
      case ResponseCallbackCommands.buy: {
        const cartId: string = ctx.update.callback_query.from.id;
        await this.handleAddToCart(ctx, data, cartId);
        break;
      }
      case ResponseCallbackCommands.remove: {
        const cartId: string = ctx.update.callback_query.from.id;
        await this.handleRemoveFromCart(ctx, data, cartId);
        break;
      }
      default: {
        await ctx.answerCbQuery();
        break;
      }
    }
    await ctx.answerCbQuery();
  }

  @Command('/search')
  async search(@Ctx() ctx: any) {
    const searchCriteria = ctx.message.text.split('/search')[1].trim();
    const products = await this.productsService.findAll({
      name: searchCriteria,
    });
    await this.listProducts(ctx, products);
  }

  @Hears('/products')
  async hears(@Ctx() ctx: Context) {
    const categories = await this.categoryService.getAll();
    const buttons = categories.map((x) => ({
      text: x.name,
      callback_data: JSON.stringify({
        id: x.id,
        command: ResponseCallbackCommands.category,
      }),
    }));

    await ctx.reply('Alegeti din categoriile de mai jos:', {
      reply_markup: { inline_keyboard: [buttons] },
    });
  }

  @Hears('/cart')
  async cart(@Ctx() ctx: any) {
    const cartId = ctx.update.message.from.id;
    const cart = await this.cartService.getCart(cartId);
    if (!cart) {
      await ctx.reply('Cosul este gol');
    } else {
      await ctx.reply('Produse in cos:');
      this.listCartItems(ctx, cart.items);
      const fullPrice = cart.items.reduce((acc, x) => {
        return acc + x.item.price * x.quantity;
      }, 0);
      await ctx.reply(`Pret total: ${fullPrice} lei`);
    }
  }

  //handlers
  listCartItems(ctx: any, items: CartItem[]) {
    items.forEach(async (x) => {
      await ctx.reply(`Produs: ${x.item.name}. Cantitate: ${x.quantity}`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Adauga',
                callback_data: JSON.stringify({
                  id: x.item.id,
                  command: ResponseCallbackCommands.add,
                }),
              },
              {
                text: 'Sterge',
                callback_data: JSON.stringify({
                  id: x.item.id,
                  command: ResponseCallbackCommands.remove,
                }),
              },
            ],
          ],
        },
      });
    });
  }

  async handleAddToCart(ctx: any, data: ResponseCallback, cartId: string) {
    const product = await this.productsService.findOne(data.id);
    const cartItem = await this.cartService.addToCart(product, cartId);
    if (cartItem) {
      await ctx.reply(
        `${product.name} | adaugat in cos. | Cantitate ${cartItem.quantity}`,
      );
    }
  }

  async handleRemoveFromCart(
    ctx: Context,
    data: ResponseCallback,
    cartId: string,
  ) {
    const product = await this.productsService.findOne(data.id);
    const cartItem = await this.cartService.removeFromCart(product, cartId);
    if (cartItem) {
      switch (cartItem.quantity) {
        case 0:
          await ctx.reply(`${product.name} | sters din in cos. `);
          break;

        default:
          await ctx.reply(
            `${product.name} | sa scazut din cantitate. | Cantitate ${cartItem.quantity}`,
          );
          break;
      }
    }
  }

  async handleShowProductsByCategory(ctx: any, data: ResponseCallback) {
    const products = await this.productsService.findAll({
      category: data.id,
    });
    await this.listProducts(ctx, products);
  }

  async listProducts(ctx: any, products: ProductsViewDto) {
    const baseUrl = 'http://localhost:3000/api/';
    if (products.items.length === 0) {
      await ctx.reply('Nu am gasit nici un produs');
    } else {
      products.items.forEach(async (x) => {
        await ctx.replyWithPhoto(
          { url: baseUrl + x.image },
          {
            caption: `${x.name} | ${x.price} lei | ${x.description}`,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Cumpara',
                    callback_data: JSON.stringify({
                      id: x.id,
                      command: ResponseCallbackCommands.buy,
                    }),
                  },
                ],
              ],
            },
          },
        );
      });
    }
  }
}
