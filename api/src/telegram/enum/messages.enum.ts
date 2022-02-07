/* eslint-disable prettier/prettier */
export enum Messages {
  // Base
  Start = 'Te salut, bun venit in magazin, pentru a naviga foloseste comenzile afisate)',
  Help = 'Foloseste butoanele de mai jos pentru a naviga.\n daca ai dificultati poti contacta un administrator',
  InfoCart = 'Daca modificati cantiatea unui produs, pentru a vedea pretul total, apasati din nou pe coș',
  AvailableProducts = '---Produse disponibile:---',
  ContactDisclaimer = 'Pentru a putea lua legatura, am nevoie de date de contact. esti de acord sa mi le oferi?',
  ContactAgree = 'Da, sunt de acord',
  ProductCouldNotBeAddedToCart = 'Nu sa putut adauga produsul in cos.',
  OutOfStockFailure = 'Nu sa putut adauga produsul in cos pentru ca nu se afla atata cantiate in stock',
  ProductRemovedFromCart = `Produs: {0} | Sters din in cos. `,
  Buy = 'Cumpara',
  SendOrder = 'Trimite comanda',
  ContactAccepted = 'Perfect, acum poti sa trimiti comanda sau sa te intorci la catalogul de produse!',

  ProductInCart = `In Coș ({0})`,
  ProductAddedToCart = `{0} | adaugat in cos. | Cantitate {1}`,
  PageInfo = `Pagina {0} din {1}`,
  FullPrice = `Pret total: {0} lei`,
  ProductInfo = `Produs: {0} | Pret: {1} Lei`,
  ProductInfoFull = `Produs: {0} | Pret: {1} x {2} = {3} lei\n`,

  // Description
  ChoseFromCategories = 'Alegeti din categoriile de mai jos:',
  CartItems = '---Produse in cos:---',

  // Empty items
  EmptyCart = 'Coșul este gol',
  NoProductsFound = 'Nu sa gasit nici un produs',

  // Page info
  PreviousPage = '<<',
  NextPage = '>>',

  // Commands
  ListProducts = 'Catalog de produse 🏪',
  ShowCart = 'Coș 🛒',

  OrderSuccess = `Cosul a fost plasat cu success.\n
Produse Cumparate:\n
{0}
Pret total: {1} lei\n
Anunta vanzatoru cu codul comenzii: {2}
Contact: {3}`,

  AdminMessage = `A fost plasata o noua comanda.\n
Produse Cumparate:\n
{0}
Pret total: {1} lei\n
Codul comenzi: {2}\n
Client: {3}\n
Telefon: {4}\n`,

  Back = 'Back',
  Checkout = 'Trimite',
}
