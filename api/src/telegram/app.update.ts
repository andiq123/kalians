/* eslint-disable prettier/prettier */
import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { ProductsViewDto } from 'src/products/dto/products-view.dto';
import { CategoryService } from 'src/products/services/category.service';
import { ProductsService } from 'src/products/services/products.service';
import { Context } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { Messages } from './messages.enum';
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
  async start(@Ctx() ctx: any) {
    await ctx.reply(Messages.Start, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: Messages.ListProducts }, { text: Messages.ShowCart }],
        ],
      },
    });
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply(Messages.Help);
    await ctx.reply('Comenzi: ', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: Messages.ListProducts }, { text: Messages.ShowCart }],
        ],
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
          const cartId = this.getCartId(ctx);
          await this.cartService.setSearch(cartId, {
            categoryId: response.id,
            pageNumber: 0,
            pageSize: 5,
          });
        }
        await this.handleShowProductsByCategory(ctx, !response.id);
        break;
      }
      case ResponseCallbackCommands.viewProduct: {
        const cartId = this.getCartId(ctx);
        const searchDto = await this.cartService.getSearch(cartId);

        //deletes pages message
        try {
          if (searchDto.pageMessageId) {
            await ctx.deleteMessage(searchDto.pageMessageId);
          }
        } catch (error) {}

        // console.log('miaws');
        await this.handleViewProduct(ctx, response.id);
        await ctx.answerCbQuery();
        break;
      }
      case ResponseCallbackCommands.previousPage: {
        const cartId = this.getCartId(ctx);
        const searchData = await this.cartService.getSearch(cartId);
        searchData.pageNumber = searchData.pageNumber - 1;
        await this.cartService.setSearch(cartId, searchData);
        await this.handleShowProductsByCategory(ctx, true);
        break;
      }
      case ResponseCallbackCommands.nextPage: {
        const cartId = this.getCartId(ctx);
        const searchData = await this.cartService.getSearch(cartId);
        searchData.pageNumber = searchData.pageNumber + 1;
        await this.cartService.setSearch(cartId, searchData);
        await this.handleShowProductsByCategory(ctx, true);
        break;
      }
      case ResponseCallbackCommands.buy: {
        // const message = ctx.update.callback_query.message;
        const cartId = this.getCartId(ctx);
        const cartItem = await this.handleAddToCart(response.id, cartId);
        if (cartId && cartItem) {
          if (cartItem.quantity > 0) {
            await ctx.editMessageReplyMarkup({
              inline_keyboard: [
                this.show_buy_layout(
                  cartItem.item.id,
                  this.useTemplate(Messages.ProductInCart, cartItem.quantity),
                ),
              ],
            });
          }

          await ctx.answerCbQuery(
            this.useTemplate(
              Messages.ProductAddedToCart,
              cartItem.item.name,
              cartItem.quantity,
            ),
          );
        } else {
          await ctx.reply(Messages.ProductCouldNotBeAddedToCart);
        }
        break;
      }
      case ResponseCallbackCommands.add: {
        const cartId = this.getCartId(ctx);
        const cartItem = await this.handleAddToCart(response.id, cartId);
        if (cartItem) {
          await ctx.editMessageText(
            this.useTemplate(
              Messages.ProductInfoFull,
              cartItem.item.name,
              cartItem.item.price,
              cartItem.quantity,
              cartItem.item.price * cartItem.quantity,
            ),
            {
              reply_markup: {
                inline_keyboard: [this.show_cartItem_layout(cartItem.item.id)],
              },
            },
          );
        } else {
          await ctx.reply(Messages.OutOfStockFailure);
        }
        break;
      }
      case ResponseCallbackCommands.remove: {
        const cartId = this.getCartId(ctx);
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
                this.useTemplate(
                  Messages.ProductRemovedFromCart,
                  cartItem.item.name,
                ),
              );
              break;

            default:
              await ctx.editMessageText(
                this.useTemplate(
                  Messages.ProductInfoFull,
                  cartItem.item.name,
                  cartItem.item.price,
                  cartItem.quantity,
                  cartItem.item.price * cartItem.quantity,
                ),
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
        const cartId = this.getCartId(ctx);
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

  @Hears(Messages.ListProducts)
  async hears(@Ctx() ctx: Context) {
    const categories = await this.categoryService.getAll();
    const buttons = categories.map((x) => ({
      text: x.name,
      callback_data: JSON.stringify({
        id: x.id,
        command: ResponseCallbackCommands.category,
      }),
    }));

    await ctx.reply(Messages.ChoseFromCategories, {
      reply_markup: { inline_keyboard: [buttons] },
    });
  }

  @Hears(Messages.ShowCart)
  async cart(@Ctx() ctx: any) {
    const cartId = ctx.update.message.from.id;
    const cart = await this.cartService.getCart(cartId);
    if (!cart) {
      await ctx.reply(Messages.EmtpyCart);
    } else {
      await ctx.reply(Messages.CartItems);

      this.listCartItems(ctx, cart.items);
      const fullPrice = cart.items.reduce((acc, x) => {
        return acc + x.item.price * x.quantity;
      }, 0);
      await ctx.reply(this.useTemplate(Messages.FullPrice, fullPrice), {
        reply_markup: {
          inline_keyboard: [this.get_checkout_layout(cartId)],
        },
      });
      await ctx.reply(Messages.InfoCart);
    }
  }

  //handlers
  async handleShowProductsByCategory(ctx: Context, deleteMessage = false) {
    if (deleteMessage) {
      await ctx.deleteMessage();
    }

    const cartId = this.getCartId(ctx);
    const searchData = await this.cartService.getSearch(cartId);

    try {
      if (searchData.messageId) {
        await ctx.deleteMessage(+searchData.messageId);
      }
    } catch (error) {}

    const products = await this.productsService.findAll({
      category: searchData.categoryId,
      limit: searchData.pageSize,
      offset: searchData.pageNumber,
    });

    if (products.items.length === 0) {
      await ctx.reply(Messages.NoProductsFound);
    } else {
      await this.listProducts(ctx, products);

      const totalPages = Math.ceil(products.count / searchData.pageSize);
      const { pageNumber } = searchData;
      const pageButton = await ctx.reply(
        this.useTemplate(Messages.PageInfo, pageNumber + 1, totalPages),
        {
          reply_markup: {
            inline_keyboard: this.generatePageButtons(pageNumber, totalPages),
          },
        },
      );

      await this.cartService.setSearch(cartId, {
        ...searchData,
        pageMessageId: pageButton.message_id,
      });
    }
  }

  async listProducts(ctx: Context, products: ProductsViewDto) {
    const buttons: InlineKeyboardButton[][] = products.items.map((x) => [
      {
        text: this.useTemplate(Messages.ProductInfo, x.name, x.price),
        callback_data: JSON.stringify({
          id: x.id,
          command: ResponseCallbackCommands.viewProduct,
        }),
      },
    ]);

    const message = await ctx.reply(Messages.AvailableProducts, {
      disable_notification: true,
      reply_markup: {
        inline_keyboard: buttons,
      },
    });

    const cartId = this.getCartId(ctx);
    const searchDto = await this.cartService.getSearch(cartId);
    searchDto.messageId = message.message_id;
    await this.cartService.setSearch(cartId, searchDto);
  }

  async handleViewProduct(ctx: any, productId: string) {
    await ctx.deleteMessage();
    const product = await this.productsService.findOne(productId);

    await ctx.replyWithPhoto(
      { url: product.image },
      {
        caption: this.useTemplate(
          Messages.ProductInfo,
          product.name,
          product.price,
        ),
        reply_markup: {
          inline_keyboard: [this.show_buy_layout(product.id, Messages.Buy)],
        },
      },
    );
  }

  async handleCheckOut(cartId: string, ctx: Context) {
    const cartBeforeSubmit = await this.cartService.getCart(cartId);
    if (!cartBeforeSubmit) {
      await ctx.reply(Messages.EmtpyCart);
      return;
    } else if (!cartBeforeSubmit.phoneNumber && !cartBeforeSubmit.clientName) {
      await ctx.reply(Messages.ContactDisclaimer, {
        reply_markup: {
          one_time_keyboard: true,
          keyboard: [[{ text: Messages.ContactAgree, request_contact: true }]],
        },
      });
      return;
    }

    const cart = await this.cartService.submitCart(cartId);
    await ctx.reply(
      this.useTemplate(
        Messages.OrderSuccess,
        cartBeforeSubmit.items.map((x) =>
          this.useTemplate(Messages.ProductInfo, x.item.name, x.item.price),
        ),
        cart.totalPrice,
        cart.id,
      ),
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [{ text: Messages.ListProducts }, { text: Messages.ShowCart }],
          ],
        },
      },
    );

    // mesaj for admin
    const adminData = this.cartService.getAdminDetails;
    await ctx.telegram.sendMessage(
      adminData.id,
      this.useTemplate(
        Messages.AdminMessage,
        cartBeforeSubmit.items.map((x) =>
          this.useTemplate(Messages.ProductInfo, x.item.name, x.item.price),
        ),
        cart.totalPrice,
        cart.id,
        cart.clientName,
        cart.phoneNumber,
      ),
    );
  }

  async listCartItems(ctx: any, items: CartItem[]) {
    for (let i = 0; i < items.length; i++) {
      await ctx.reply(
        this.useTemplate(
          Messages.ProductInfoFull,
          items[i].item.name,
          items[i].item.price,
          items[i].quantity,
          items[i].item.price * items[i].quantity,
        ),
        {
          reply_markup: {
            inline_keyboard: [this.show_cartItem_layout(items[i].item.id)],
          },
        },
      );
    }
  }

  async handleAddToCart(productId: string, cartId: string): Promise<CartItem> {
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

  get_checkout_layout(cartId: string) {
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

  generatePageButtons(
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

  useTemplate(template: string, ...itemsToBeReplaced): string {
    return template.replace(/{(\d+)}/g, (match, number) => {
      return itemsToBeReplaced[number] || match;
    });
  }
  getCartId(ctx: any) {
    return ctx.update.callback_query.from.id;
  }
}
