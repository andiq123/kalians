/* eslint-disable prettier/prettier */
import { Update, Ctx, Start, Help, On, Hears, Command } from 'nestjs-telegraf';
import { ProductsViewDto } from 'src/products/dto/products-view.dto';
import { CategoryService } from 'src/products/services/category.service';
import { ProductsService } from 'src/products/services/products.service';
import { Context } from 'telegraf';
import { CartItem } from './models/cart-cache.interface';

import {
  ResponseCallback,
  ResponseCallbackCommands,
} from './models/response-callback.interface';
import { CartServiceCache } from './services/cart-cache.services';

@Update()
export class AppUpdate {
  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private cartService: CartServiceCache,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      'Te salut, bun venit in magazin, pentru a naviga foloseste comenzile afisate)',
      {
        reply_markup: {
          keyboard: [
            [{ text: '/products' }, { text: '/search' }, { text: '/cart' }],
          ],
        },
      },
    );
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply('Foloseste /products pentru a vedea produsele');
    await ctx.reply('Foloseste /cart pentru a vedea cosul');
    await ctx.reply('Comenzi: ', {
      reply_markup: {
        keyboard: [
          [{ text: '/products' }, { text: '/search' }, { text: '/cart' }],
        ],
      },
    });
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
        // const message = ctx.update.callback_query.message;

        const cartId: string = ctx.update.callback_query.from.id;
        const cartItem = await this.handleAddToCart(ctx, data, cartId);

        if (cartId && cartItem) {
          if (cartItem.quantity === 1) {
            await ctx.editMessageReplyMarkup({
              inline_keyboard: [this.show_buy_layout(null, 'In Cos')],
            });
          }

          await ctx.answerCbQuery(
            `${cartItem.item.name} | adaugat in cos. | Cantitate ${cartItem.quantity}`,
          );
        } else {
          await ctx.reply('Nu sa putut adauga produsul in cos.');
        }
        break;
      }
      case ResponseCallbackCommands.add: {
        const cartId: string = ctx.update.callback_query.from.id;
        const cartItem = await this.handleAddToCart(ctx, data, cartId);
        if (cartItem) {
          await ctx.editMessageText(
            `Produs: ${cartItem.item.name} | Pret: ${cartItem.item.price} | Cantitate: ${cartItem.quantity}`,
            {
              reply_markup: {
                inline_keyboard: [this.show_cartItem_layout(cartItem.item.id)],
              },
            },
          );
        } else {
          await ctx.reply(
            'Nu sa putut adauga produsul in cos pentru ca nu se afla atata cantiate in stock',
          );
        }
        break;
      }

      case ResponseCallbackCommands.remove: {
        const cartId: string = ctx.update.callback_query.from.id;
        const cartItem = await this.handleRemoveFromCart(ctx, data, cartId);
        if (cartItem) {
          switch (cartItem.quantity) {
            case 0:
              await ctx.reply(
                `Produs: ${cartItem.item.name} | Sters din in cos. `,
              );
              break;

            default:
              await ctx.editMessageText(
                `Produs: ${cartItem.item.name} | Pret: ${cartItem.item.price} | Cantitate: ${cartItem.quantity}`,
                {
                  reply_markup: {
                    inline_keyboard: [
                      this.show_cartItem_layout(cartItem.item.id),
                    ],
                  },
                },
              );
              break;
          }
        }
        break;
      }
      case ResponseCallbackCommands.checkout: {
        const cart = await this.cartService.submitCart(data.id);
        await ctx.reply(
          `Cosul a fost plasat. | Pret total: ${cart.totalPrice} lei.
           Anunta vanzatoru cu codul comenzi: ${cart.id}`,
        );
        break;
      }
      default: {
        await ctx.answerCbQuery();
        break;
      }
    }
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
      await ctx.reply('---Produse in cos:---');
      this.listCartItems(ctx, cart.items);
      const fullPrice = cart.items.reduce((acc, x) => {
        return acc + x.item.price * x.quantity;
      }, 0);
      await ctx.reply(`Pret total: ${fullPrice} lei`, {
        reply_markup: {
          inline_keyboard: [this.get_checkout_layout(cartId)],
        },
      });
    }
  }

  //handlers
  listCartItems(ctx: any, items: CartItem[]) {
    items.forEach(async (x) => {
      await ctx.reply(
        `Produs: ${x.item.name} | Pret: ${x.item.price} | Cantitate: ${x.quantity}`,
        {
          reply_markup: {
            inline_keyboard: [this.show_cartItem_layout(x.item.id)],
          },
        },
      );
    });
  }

  async handleAddToCart(
    ctx: any,
    data: ResponseCallback,
    cartId: string,
  ): Promise<CartItem> {
    const product = await this.productsService.findOne(data.id);
    const cartItem = await this.cartService.addToCart(product, cartId);
    return cartItem;
  }

  async handleRemoveFromCart(
    ctx: Context,
    data: ResponseCallback,
    cartId: string,
  ): Promise<CartItem> {
    const product = await this.productsService.findOne(data.id);
    const cartItem = await this.cartService.removeFromCart(product, cartId);
    return cartItem;
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
            caption: `${x.name} | ${x.price} lei | ${x.description} | ${
              x.inStockQuantity > 0 ? 'In Stock' : 'Nu este in stock'
            }`,
            reply_markup: {
              inline_keyboard: [
                x.inStockQuantity > 0
                  ? this.show_buy_layout(x.id, 'Cumpara')
                  : this.show_buy_layout_not_in_stock(),
              ],
            },
          },
        );
      });
    }
  }

  //buttons markup
  show_buy_layout(id: string, text: string) {
    return [
      {
        text,
        callback_data: JSON.stringify({
          id: id,
          command: ResponseCallbackCommands.buy,
        }),
      },
    ];
  }

  show_buy_layout_not_in_stock() {
    return [
      {
        text: 'Nu este in stock',
        callback_data: JSON.stringify({
          id: '',
          command: ResponseCallbackCommands.notInStock,
        }),
      },
    ];
  }

  get_checkout_layout(cartId: string) {
    return [
      {
        text: 'Trimite comanda',
        callback_data: JSON.stringify({
          id: cartId,
          command: ResponseCallbackCommands.checkout,
        }),
      },
    ];
  }

  show_cartItem_layout(id: string) {
    return [
      {
        text: 'Adauga',
        callback_data: JSON.stringify({
          id: id,
          command: ResponseCallbackCommands.add,
        }),
      },
      {
        text: 'Sterge',
        callback_data: JSON.stringify({
          id: id,
          command: ResponseCallbackCommands.remove,
        }),
      },
    ];
  }
}
