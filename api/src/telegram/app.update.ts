/* eslint-disable prettier/prettier */
import { Update, Ctx, Start, Help, On, Hears, Command } from 'nestjs-telegraf';
import { ProductsViewDto } from 'src/products/dto/products-view.dto';
import { CategoryService } from 'src/products/services/category.service';
import { ProductsService } from 'src/products/services/products.service';
import { Context } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CartItem, SearchData } from './models/cart-cache.interface';

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
  async start(@Ctx() ctx: any) {
    await ctx.reply(
      'Te salut, bun venit in magazin, pentru a naviga foloseste comenzile afisate)',
      {
        reply_markup: {
          resize_keyboard: true,
          input_field_placeholder: 'Cauta produs',
          keyboard: [[{ text: 'Catalog de produse 🏪' }, { text: 'Coș 🛒' }]],
        },
      },
    );
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply(
      'Foloseste butoanele de mai jos pentru a naviga.\n daca ai dificultati poti contacta un administrator',
    );
    await ctx.reply('Comenzi: ', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [[{ text: 'Catalog de produse 🏪' }, { text: 'Coș 🛒' }]],
      },
    });
  }

  @On('callback_query')
  async on(@Ctx() ctx: any) {
    // get the message
    const response: ResponseCallback = JSON.parse(ctx.callbackQuery.data);
    switch (response.command) {
      case ResponseCallbackCommands.category: {
        if (response.id) {
          const cartId = ctx.update.callback_query.from.id;
          const search: SearchData = {
            categoryId: response.id,
            pageNumber: 1,
            pageSize: 5,
          };
          await this.cartService.setSearch(cartId, search);
        }
        await this.handleShowProductsByCategory(ctx, !response.id);
        break;
      }
      case ResponseCallbackCommands.viewProduct: {
        await this.handleViewProduct(ctx, response.id);
        await ctx.answerCbQuery();
        break;
      }
      case ResponseCallbackCommands.previousPage: {
        const cartId = ctx.update.callback_query.from.id;
        const searchData = await this.cartService.getSearch(cartId);
        searchData.pageNumber = searchData.pageNumber - 1;
        await this.cartService.setSearch(cartId, searchData);
        await this.handleShowProductsByCategory(ctx, true);
        break;
      }
      case ResponseCallbackCommands.nextPage: {
        const cartId = ctx.update.callback_query.from.id;
        const searchData = await this.cartService.getSearch(cartId);
        searchData.pageNumber = searchData.pageNumber + 1;
        await this.cartService.setSearch(cartId, searchData);
        await this.handleShowProductsByCategory(ctx, true);
        break;
      }
      case ResponseCallbackCommands.buy: {
        // const message = ctx.update.callback_query.message;
        const cartId: string = ctx.update.callback_query.from.id;
        const cartItem = await this.handleAddToCart(ctx, response.id, cartId);
        if (cartId && cartItem) {
          if (cartItem.quantity > 0) {
            await ctx.editMessageReplyMarkup({
              inline_keyboard: [
                this.show_buy_layout(
                  cartItem.item.id,
                  `In Coș (${cartItem.quantity})`,
                ),
              ],
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
        const cartItem = await this.handleAddToCart(ctx, response.id, cartId);
        if (cartItem) {
          await ctx.editMessageText(
            `Produs: ${cartItem.item.name} | Pret: ${cartItem.item.price} x ${
              cartItem.quantity
            } = ${cartItem.item.price * cartItem.quantity}\n`,
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
        const cartItem = await this.handleRemoveFromCart(
          ctx,
          response.id,
          cartId,
        );
        if (cartItem) {
          switch (cartItem.quantity) {
            case 0:
              await ctx.deleteMessage();
              await ctx.reply(
                `Produs: ${cartItem.item.name} | Sters din in cos. `,
              );
              break;

            default:
              await ctx.editMessageText(
                `Produs: ${cartItem.item.name} | Pret: ${
                  cartItem.item.price
                } x ${cartItem.quantity} = ${
                  cartItem.item.price * cartItem.quantity
                }\n`,
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
        //get cart id
        const cartId: string = ctx.update.callback_query.from.id;
        await this.handleCheckOut(cartId, ctx);
        break;
      }
      default: {
        await ctx.answerCbQuery();
        break;
      }
    }
  }

  @On('contact')
  async repospond(@Ctx() ctx: any) {
    const { phone_number, first_name, user_id } = ctx.update.message.contact;

    await this.cartService.setClientName(user_id, first_name);
    await this.cartService.setPhoneNumber(user_id, phone_number);
    await ctx.reply(
      'Perfect, acum poti sa trimiti comanda sau sa te intorci la catalogul de produse!',
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [
              { text: 'Trimite Coș' },
              { text: 'Catalog de produse 🏪' },
              { text: 'Coș 🛒' },
            ],
          ],
        },
      },
    );
  }

  @Hears('Trimite Coș')
  async checkOut(@Ctx() ctx: any) {
    const id = ctx.update.message.from.id;
    await this.handleCheckOut(id, ctx);
  }

  // @Command('/search')
  // async search(@Ctx() ctx: any) {
  //   const searchCriteria = ctx.message.text.split('/search')[1].trim();
  //   const products = await this.productsService.findAll({
  //     name: searchCriteria,
  //   });
  //   await this.listProducts(ctx, products);
  // }

  @Hears('Catalog de produse 🏪')
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

  @Hears('Coș 🛒')
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
  async handleShowProductsByCategory(ctx: any, deleteMessage = false) {
    if (deleteMessage) {
      await ctx.deleteMessage();
    }

    const cartId = ctx.update.callback_query.from.id;
    const searchData = await this.cartService.getSearch(cartId);

    try {
      if (searchData.messageId) {
        await ctx.deleteMessage(searchData.messageId);
      }
    } catch (error) {}

    const products = await this.productsService.findAll({
      category: searchData.categoryId,
      limit: searchData.pageSize,
      offset: searchData.pageNumber,
    });
    const totalPages = Math.ceil(products.count / searchData.pageSize);
    if (products.items.length === 0) {
      await ctx.reply('Nu am gasit nici un produs');
    } else {
      await this.listProducts(ctx, products);

      await ctx.reply(
        'Pagina ' + searchData.pageNumber + ' din ' + totalPages,
        {
          reply_markup: {
            disable_notification: true,
            inline_keyboard: [
              [
                searchData.pageNumber > 1
                  ? {
                      text: '<<',
                      callback_data: JSON.stringify({
                        command: ResponseCallbackCommands.previousPage,
                      }),
                    }
                  : { text: '-', callback_data: JSON.stringify('') },
                searchData.pageNumber < totalPages
                  ? {
                      text: '>>',
                      callback_data: JSON.stringify({
                        command: ResponseCallbackCommands.nextPage,
                      }),
                    }
                  : { text: '-', callback_data: JSON.stringify('') },
              ],
            ],
          },
        },
      );
    }
  }

  async listProducts(ctx: any, products: ProductsViewDto) {
    const buttons: InlineKeyboardButton[][] = products.items.map((x) => [
      {
        text: `Produs: ${x.name} | Pret: ${x.price} Lei | ${
          x.inStockQuantity > 0 ? 'In stoc' : 'Nu este in stoc'
        }`,
        callback_data: JSON.stringify({
          id: x.id,
          command: ResponseCallbackCommands.viewProduct,
        }),
      },
    ]);

    const message = await ctx.reply('---Produse disponibile:---', {
      disable_notification: true,
      reply_markup: {
        inline_keyboard: buttons,
      },
    });

    const cartId = ctx.update.callback_query.from.id;
    const searchDto = await this.cartService.getSearch(cartId);
    searchDto.messageId = message.message_id;
    await this.cartService.setSearch(cartId, searchDto);
  }

  async handleViewProduct(ctx: Context, productId: string) {
    await ctx.deleteMessage();

    const baseUrl = this.cartService.getBaseUrl;
    const product = await this.productsService.findOne(productId);

    await ctx.replyWithPhoto(
      { url: baseUrl + product.image },
      {
        caption: `${product.name} | ${product.price} lei | ${
          product.description
        } | ${product.inStockQuantity > 0 ? 'In Stock' : 'Nu este in stock'}`,
        reply_markup: {
          inline_keyboard: [this.show_buy_layout(product.id, 'Cumpara')],
        },
      },
    );
  }

  async handleCheckOut(cartId: string, ctx: Context) {
    const cartBeforeSubmit = await this.cartService.getCart(cartId);
    if (!cartBeforeSubmit) {
      await ctx.reply('Cosul este gol');
      return;
    } else if (!cartBeforeSubmit.phoneNumber && !cartBeforeSubmit.clientName) {
      await ctx.reply(
        'Pentru a putea lua legatura, am nevoie de date de contact. esti de acord sa mi le oferi?',
        {
          reply_markup: {
            one_time_keyboard: true,
            keyboard: [[{ text: 'Da, sunt de acord', request_contact: true }]],
          },
        },
      );
      return;
    }

    const cart = await this.cartService.submitCart(cartId);
    await ctx.reply(
      `Cosul a fost plasat cu success.\n
       Produse Cumparate:\n
      ${cartBeforeSubmit.items.map(
        (x) =>
          `Produs: ${x.item.name} | Pret: ${x.item.price} x ${x.quantity} = ${
            x.item.price * x.quantity
          }\n`,
      )}
       Pret total: ${cart.totalPrice} lei\n
       Anunta vanzatoru cu codul comenzi: ${cart.id}`,
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: 'Catalog de produse 🏪' }, { text: 'Coș 🛒' }]],
        },
      },
    );

    // mesaj for admin
    const adminData = this.cartService.getAdminDetails;
    await ctx.telegram.sendMessage(
      adminData.id,
      `A fost plasata o noua comanda.\n
      Produse Cumparate:\n
      ${cartBeforeSubmit.items.map(
        (x) =>
          `Produs: ${x.item.name} | Pret: ${x.item.price} x ${x.quantity} = ${
            x.item.price * x.quantity
          }\n`,
      )}
      Pret total: ${cart.totalPrice} lei\n
      Codul comenzi: ${cart.id}\n
      Client: ${cart.clientName}\n
      Telefon: ${cart.phoneNumber}\n`,
      {
        reply_markup: {
          keyboard: [[{ text: '/pula' }, { text: '/hazz john' }]],
        },
      },
    );
  }

  async listCartItems(ctx: any, items: CartItem[]) {
    for (let i = 0; i < items.length; i++) {
      await ctx.reply(
        `Produs: ${items[i].item.name} | Pret: ${items[i].item.price} x ${
          items[i].quantity
        } = ${items[i].item.price * items[i].quantity}\n`,
        {
          reply_markup: {
            inline_keyboard: [this.show_cartItem_layout(items[i].item.id)],
          },
        },
      );
    }
  }

  async handleAddToCart(
    ctx: any,
    productId: string,
    cartId: string,
  ): Promise<CartItem> {
    const product = await this.productsService.findOne(productId);
    const cartItem = await this.cartService.addToCart(product, cartId);
    return cartItem;
  }

  async handleRemoveFromCart(
    ctx: Context,
    productId: string,
    cartId: string,
  ): Promise<CartItem> {
    const product = await this.productsService.findOne(productId);
    const cartItem = await this.cartService.removeFromCart(product, cartId);
    return cartItem;
  }

  //buttons markup
  show_buy_layout(id: string, text: string) {
    return [
      {
        text: 'Back',
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
}
