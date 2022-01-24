"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[882],{2882:(z,C,p)=>{p.r(C),p.d(C,{ProductsModule:()=>E});var u=p(9808),d=p(1631);class T{constructor(r){this.name=r.name,this.category=r.category,this.limit=r.limit,this.offset=r.offset}}var t=p(4893),m=p(520),v=p(3900),x=p(9646),g=p(2340);let b=(()=>{class o{constructor(e){this.http=e,this.apiUrl=g.N.apiUrl}getProducts(e){let n=new m.LE;return Object.entries(e).forEach(([i,s])=>{s&&(n=n.append(i,s))}),this.http.get(`${this.apiUrl}products`,{params:n})}getProduct(e){return this.http.get(`${this.apiUrl}products/${e}`)}deleteProduct(e){return this.http.delete(`${this.apiUrl}products/${e}`)}createProduct(e,n){return this.http.post(`${this.apiUrl}products`,e).pipe((0,v.w)(i=>{if(!n)return(0,x.of)(i);const s=new FormData;return s.append("file",n),this.http.post(`${this.apiUrl}products/file/${i.id}`,s)}))}updateProduct(e,n){return this.http.patch(`${this.apiUrl}products/${e.id}`,e).pipe((0,v.w)(i=>{if(!n)return(0,x.of)(i);const s=new FormData;return s.append("file",n),this.http.post(`${this.apiUrl}products/file/${e.id}`,s)}))}incrementInStockValue(e){return this.http.get(`${this.apiUrl}products/increment/${e}`)}decrementInStockValue(e){return this.http.get(`${this.apiUrl}products/decrement/${e}`)}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(m.eN))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),h=(()=>{class o{constructor(e){this.http=e,this.apiUrl=g.N.apiUrl}getCategories(){return this.http.get(`${this.apiUrl}products/sub/categories`)}deleteCategory(e){return this.http.delete(`${this.apiUrl}products/sub/categories/${e}`)}createCategory(e){return this.http.post(`${this.apiUrl}products/sub/categories`,{name:e})}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(m.eN))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var c=p(2382),f=p(7579);let M=(()=>{class o{constructor(){this.apiUrl=g.N.apiUrl,this.increment=new f.x,this.decrement=new f.x,this.onDeleteProduct=new f.x,this.minValue=0,this.incrementLoading=!1}ngOnInit(){}onDelete(){this.onDeleteProduct.next(this.product.id)}onIncrement(){this.increment.next(this.product.id)}onDecrement(){this.product.inStockQuantity<this.minValue+1||this.decrement.next(this.product.id)}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-product"]],inputs:{product:"product"},outputs:{increment:"increment",decrement:"decrement",onDeleteProduct:"onDeleteProduct"},decls:27,vars:13,consts:[[1,"product"],[1,"product-image"],["alt","product",3,"src"],[1,"product-details"],[1,"product-title"],[1,"product-description"],[1,"product-price"],[1,"product-quantity"],[1,"actions","d-flex","btn-group","gap-2","mb-2"],[1,"btn","btn-success",3,"click"],[1,"fas","fa-plus-square"],[1,"btn","btn-secondary",3,"click"],[1,"fas","fa-minus-square"],[1,"row"],[1,"btn","btn-secondary","mt-3",3,"routerLink"],[1,"btn","btn-secondary","mt-3",3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"div",3),t.TgZ(4,"div",4),t.TgZ(5,"b"),t._uU(6),t.ALo(7,"titlecase"),t.qZA(),t.qZA(),t.TgZ(8,"div",5),t._uU(9),t.ALo(10,"titlecase"),t.qZA(),t.TgZ(11,"div",6),t._uU(12),t.ALo(13,"currency"),t.qZA(),t.TgZ(14,"div",7),t.TgZ(15,"b"),t._uU(16),t.qZA(),t.qZA(),t.TgZ(17,"div",8),t.TgZ(18,"button",9),t.NdJ("click",function(){return n.onIncrement()}),t._UZ(19,"i",10),t.qZA(),t.TgZ(20,"button",11),t.NdJ("click",function(){return n.onDecrement()}),t._UZ(21,"i",12),t.qZA(),t.qZA(),t.TgZ(22,"div",13),t.TgZ(23,"button",14),t._uU(24,"Edit"),t.qZA(),t.TgZ(25,"button",15),t.NdJ("click",function(){return n.onDelete()}),t._uU(26,"Delete"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(2),t.Q6J("src",n.product.image&&n.apiUrl+n.product.image||"assets/no-product-image.png",t.LSH),t.xp6(4),t.hij(" ",t.lcZ(7,6,n.product.name),""),t.xp6(3),t.Oqu(t.lcZ(10,8,n.product.description)),t.xp6(3),t.Oqu(t.xi3(13,10,n.product.price,"EUR")),t.xp6(4),t.hij("In stock: ",n.product.inStockQuantity,""),t.xp6(7),t.Q6J("routerLink","edit/"+n.product.id))},directives:[d.rH],pipes:[u.rS,u.H9],styles:[".product[_ngcontent-%COMP%]{width:200px;padding:30px;background-color:#e7e0e0;border-radius:20px;box-shadow:1px 1px 10px 3px #e7e2e2bf}.product[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]{width:150px;height:200px;border-radius:20px;overflow:hidden}.product[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.product[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%]{font-size:.8rem}.slide-in[_ngcontent-%COMP%]{animation:slide-in 1s ease-in-out forwards}@keyframes slide-in{0%{opacity:0;transform:translateY(-20%)}50%{opacity:1;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}"]}),o})();var A=p(2492);function O(o,r){if(1&o&&(t.TgZ(0,"option",8),t._uU(1),t.ALo(2,"titlecase"),t.qZA()),2&o){const e=r.$implicit;t.Q6J("value",e.id),t.xp6(1),t.Oqu(t.lcZ(2,2,e.name))}}function U(o,r){1&o&&(t.TgZ(0,"div",9),t.TgZ(1,"h1"),t._uU(2,"No products found"),t.qZA(),t.qZA())}function q(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"app-product",16),t.NdJ("increment",function(i){return t.CHM(e),t.oxw(2).increment(i)})("decrement",function(i){return t.CHM(e),t.oxw(2).decrement(i)})("onDeleteProduct",function(i){return t.CHM(e),t.oxw(2).onDeleteProduct(i)}),t.qZA()}2&o&&t.Q6J("product",r.$implicit)}function I(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",10),t.TgZ(1,"div",11),t.YNc(2,q,1,1,"app-product",12),t.qZA(),t.TgZ(3,"div",13),t.TgZ(4,"div",14),t.TgZ(5,"pagination",15),t.NdJ("ngModelChange",function(i){return t.CHM(e),t.oxw().currentPage=i})("pageChanged",function(i){return t.CHM(e),t.oxw().onPageChange(i)}),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=t.oxw();t.xp6(2),t.Q6J("ngForOf",e.products),t.xp6(3),t.Q6J("totalItems",e.totalItems)("itemsPerPage",e.filters.limit)("ngModel",e.currentPage)}}let J=(()=>{class o{constructor(e,n){this.productsService=e,this.categoriesService=n,this.subscriptions=[],this.products=[],this.categories=[],this.currentPage=1,this.totalItems=0,this.filters=new T({category:"",limit:10,offset:0,name:""})}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}ngOnInit(){this.populateCategories(),this.populateProducts()}populateCategories(){this.subscriptions.push(this.categoriesService.getCategories().subscribe(e=>{this.categories=e}))}onChangeCategory(){this.populateProducts()}onPageChange(e){this.filters.offset=(e.page-1)*this.filters.limit,this.populateProducts()}populateProducts(){this.productsService.getProducts(this.filters).subscribe(e=>{this.totalItems=e.count,this.products=e.items})}onSearch(){this.populateProducts()}onDeleteProduct(e){this.subscriptions.push(this.productsService.deleteProduct(e).subscribe(()=>{this.products=this.products.filter(n=>n.id!==e)}))}increment(e){this.subscriptions.push(this.productsService.incrementInStockValue(e).subscribe(n=>{this.products=this.products.map(i=>i.id===n.id?n:i)}))}decrement(e){this.subscriptions.push(this.productsService.decrementInStockValue(e).subscribe(n=>{this.products=this.products.map(i=>i.id===n.id?n:i)}))}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(b),t.Y36(h))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-products"]],decls:9,vars:5,consts:[[1,"products-container"],[1,"form-group"],["type","text","placeholder","Search here products...",1,"form-control",3,"ngModel","ngModelChange","input"],[1,"form-control","mt-2",3,"ngModel","ngModelChange","change"],["value",""],[3,"value",4,"ngFor","ngForOf"],["class","no-products",4,"ngIf"],["class","d-flex flex-column justify-content-center",4,"ngIf"],[3,"value"],[1,"no-products"],[1,"d-flex","flex-column","justify-content-center"],[1,"mt-5","products"],[3,"product","increment","decrement","onDeleteProduct",4,"ngFor","ngForOf"],[1,"row","mt-3","mx-auto"],[1,"col-xs-12","col-12"],[3,"totalItems","itemsPerPage","ngModel","ngModelChange","pageChanged"],[3,"product","increment","decrement","onDeleteProduct"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"input",2),t.NdJ("ngModelChange",function(s){return n.filters.name=s})("input",function(){return n.onSearch()}),t.qZA(),t.TgZ(3,"select",3),t.NdJ("ngModelChange",function(s){return n.filters.category=s})("change",function(){return n.onChangeCategory()}),t.TgZ(4,"option",4),t._uU(5,"All categories"),t.qZA(),t.YNc(6,O,3,4,"option",5),t.qZA(),t.qZA(),t.YNc(7,U,3,0,"div",6),t.YNc(8,I,6,4,"div",7),t.qZA()),2&e&&(t.xp6(2),t.Q6J("ngModel",n.filters.name),t.xp6(1),t.Q6J("ngModel",n.filters.category),t.xp6(3),t.Q6J("ngForOf",n.categories),t.xp6(1),t.Q6J("ngIf",!n.products||0===n.products.length),t.xp6(1),t.Q6J("ngIf",n.products&&n.products.length>0))},directives:[c.Fj,c.JJ,c.On,c.EJ,c.YN,c.Kr,u.sg,u.O5,M,A.Qt],pipes:[u.rS],styles:[".products-container[_ngcontent-%COMP%]{height:100%;width:100%}.products-container[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{padding-top:10px;margin:0 auto;width:30%}.products-container[_ngcontent-%COMP%]   .no-products[_ngcontent-%COMP%]{margin:20% auto 0;width:-moz-fit-content;width:fit-content}.products-container[_ngcontent-%COMP%]   .products[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap;margin:0 auto;gap:20px;padding:10px;width:100%}"]}),o})();function w(o,r){if(1&o&&(t.TgZ(0,"div",3),t.TgZ(1,"label",4),t._uU(2),t.qZA(),t._UZ(3,"input",5),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("for",e.label),t.xp6(1),t.Oqu(e.label),t.xp6(1),t.Q6J("type",e.type)("formControl",e.ngControl.control)("id",e.label)}}function S(o,r){if(1&o&&(t.TgZ(0,"option",10),t._uU(1),t.qZA()),2&o){const e=r.$implicit;t.Q6J("value",e.id),t.xp6(1),t.Oqu(e.name)}}function F(o,r){if(1&o&&(t.TgZ(0,"div",6),t.TgZ(1,"label",7),t._uU(2,"Category"),t.qZA(),t.TgZ(3,"select",8),t.TgZ(4,"option"),t._uU(5,"Select an option"),t.qZA(),t.YNc(6,S,2,2,"option",9),t.qZA(),t.qZA()),2&o){const e=t.oxw();t.xp6(3),t.Q6J("formControl",e.ngControl.control),t.xp6(3),t.Q6J("ngForOf",e.categories)}}function Q(o,r){if(1&o&&(t.TgZ(0,"div"),t._uU(1),t.qZA()),2&o){const e=r.ngIf,n=t.oxw(2);t.xp6(1),t.AsE(" ",n.label," must be at least ",e.requiredLength," characters long. ")}}function k(o,r){if(1&o&&(t.TgZ(0,"div"),t._uU(1),t.qZA()),2&o){const e=t.oxw(2);t.xp6(1),t.hij(" ",e.label," is required ")}}function N(o,r){if(1&o&&(t.TgZ(0,"div"),t._uU(1),t.qZA()),2&o){const e=r.ngIf,n=t.oxw(2);t.xp6(1),t.AsE(" ",n.label," has to be minimum ",e.min," ")}}function Y(o,r){if(1&o&&(t.TgZ(0,"div",11),t.YNc(1,Q,2,2,"div",12),t.YNc(2,k,2,1,"div",12),t.YNc(3,N,2,2,"div",12),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.ngControl.control.errors.minlength),t.xp6(1),t.Q6J("ngIf",e.ngControl.control.errors.required),t.xp6(1),t.Q6J("ngIf",e.ngControl.control.errors.min)}}let $=(()=>{class o{constructor(e){this.ngControl=e,this.type="text",this.ngControl.valueAccessor=this}ngOnInit(){}writeValue(e){}registerOnChange(e){}registerOnTouched(e){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(c.a5,2))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-text-input"]],inputs:{label:"label",type:"type",categories:"categories"},decls:3,vars:3,consts:[["class","input-group mb-3 ",4,"ngIf"],["class","form-group mb-3",4,"ngIf"],["class","text-danger",4,"ngIf"],[1,"input-group","mb-3"],[1,"input-group-text",3,"for"],[1,"form-control",3,"type","formControl","id"],[1,"form-group","mb-3"],[1,"form-label"],[1,"form-control",3,"formControl"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"text-danger"],[4,"ngIf"]],template:function(e,n){1&e&&(t.YNc(0,w,4,5,"div",0),t.YNc(1,F,7,2,"div",1),t.YNc(2,Y,4,3,"div",2)),2&e&&(t.Q6J("ngIf","select"!==n.type),t.xp6(1),t.Q6J("ngIf","select"===n.type),t.xp6(1),t.Q6J("ngIf",n.ngControl.control.touched&&n.ngControl.control.errors))},directives:[u.O5,c.Fj,c.JJ,c.oH,c.EJ,c.YN,c.Kr,u.sg],styles:[""]}),o})();function D(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"form",2),t.NdJ("submit",function(){return t.CHM(e),t.oxw().onSubmit()}),t._UZ(1,"app-text-input",3),t._UZ(2,"app-text-input",4),t._UZ(3,"app-text-input",5),t._UZ(4,"app-text-input",6),t._UZ(5,"app-text-input",7),t.TgZ(6,"div",8),t._UZ(7,"img",9),t.qZA(),t.TgZ(8,"div",10),t.TgZ(9,"input",11),t.NdJ("change",function(i){return t.CHM(e),t.oxw().onFileChange(i)}),t.qZA(),t.TgZ(10,"label",12),t._uU(11,"Upload"),t.qZA(),t.qZA(),t.TgZ(12,"div",13),t.TgZ(13,"button",14),t._uU(14,"Submit"),t.qZA(),t.TgZ(15,"button",15),t._uU(16,"Cancel"),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=t.oxw();t.Q6J("formGroup",e.formGroup),t.xp6(1),t.Q6J("formControl",e.formGroup.controls.name),t.xp6(1),t.Q6J("formControl",e.formGroup.controls.description),t.xp6(1),t.Q6J("formControl",e.formGroup.controls.price),t.xp6(1),t.Q6J("formControl",e.formGroup.controls.inStockQuantity),t.xp6(1),t.Q6J("formControl",e.formGroup.controls.categoryId)("categories",e.categories),t.xp6(2),t.Q6J("src",(null==e.product?null:e.product.image)&&e.apiUrl+(null==e.product?null:e.product.image)||"assets/no-product-image.png",t.LSH)("alt",e.formGroup.controls.name.value),t.xp6(6),t.Q6J("disabled",e.formGroup.invalid)}}let Z=(()=>{class o{constructor(e,n,i,s,a){this.fb=e,this.activeRouter=n,this.router=i,this.productsService=s,this.categoriesService=a,this.subscriptions=[],this.apiUrl=g.N.apiUrl,this.categories=[]}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}ngOnInit(){this.populateCategories(),this.subscriptions.push(this.activeRouter.params.subscribe(e=>{e.id?this.populateForm(e.id):this.createForm()}))}populateCategories(){this.subscriptions.push(this.categoriesService.getCategories().subscribe(e=>{this.categories=e}))}populateForm(e){this.subscriptions.push(this.productsService.getProduct(e).subscribe(n=>{this.product=n,this.createForm()}))}createForm(){var e,n,i,s,a,l;this.formGroup=this.fb.group({id:[(null===(e=this.product)||void 0===e?void 0:e.id)||""],name:[(null===(n=this.product)||void 0===n?void 0:n.name)||"",[c.kI.required,c.kI.minLength(3)]],description:[(null===(i=this.product)||void 0===i?void 0:i.description)||"",[c.kI.required,c.kI.minLength(3)]],price:[(null===(s=this.product)||void 0===s?void 0:s.price)||"",[c.kI.required,c.kI.min(1)]],image:[],inStockQuantity:[(null===(a=this.product)||void 0===a?void 0:a.inStockQuantity)||"",[c.kI.required,c.kI.min(1)]],categoryId:[(null===(l=this.product)||void 0===l?void 0:l.categoryId)||"",[c.kI.required,c.kI.minLength(20)]]})}onSubmit(){var e;const{id:n,name:i,description:s,price:a,inStockQuantity:l,categoryId:y,image:P}=this.formGroup.value;void 0===(null===(e=this.product)||void 0===e?void 0:e.id)?this.subscriptions.push(this.productsService.createProduct({name:i,description:s,price:a,inStockQuantity:l,categoryId:y},P).subscribe(V=>{this.router.navigateByUrl("/products")})):this.subscriptions.push(this.productsService.updateProduct({id:n,name:i,description:s,price:a,inStockQuantity:l,categoryId:y},P).subscribe(V=>{this.router.navigateByUrl("/products")}))}onFileChange(e){this.formGroup.controls.image.setValue(e.target.files[0])}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(c.qu),t.Y36(d.gz),t.Y36(d.F0),t.Y36(b),t.Y36(h))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-upsert"]],decls:2,vars:1,consts:[[1,"create"],["enctype","multipart/form-data",3,"formGroup","submit",4,"ngIf"],["enctype","multipart/form-data",3,"formGroup","submit"],["label","Name",3,"formControl"],["label","Description",3,"formControl"],["label","Price","type","number",3,"formControl"],["label","Quantity","type","number",3,"formControl"],["label","Category","type","select",3,"formControl","categories"],[1,"product-image"],[3,"src","alt"],[1,"input-group","mt-3"],["type","file",1,"form-control",3,"change"],[1,"input-group-text"],[1,"btn-group","d-flex","gap-2","mt-4"],["type","submit",1,"btn","btn-primary",3,"disabled"],["type","button","routerLink","/products",1,"btn","btn-secondary"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.YNc(1,D,17,10,"form",1),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",n.formGroup))},directives:[u.O5,c._Y,c.JL,c.sg,$,c.JJ,c.oH,d.rH],styles:[".create[_ngcontent-%COMP%]{margin:0 auto;width:55%}.create[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{margin-top:10%}.create[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]{max-width:200px;display:flex;flex-flow:column;align-items:center;justify-content:center}.create[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}"]}),o})();function L(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",5),t.TgZ(1,"div",6),t.TgZ(2,"h5",7),t._uU(3),t.ALo(4,"titlecase"),t.qZA(),t.TgZ(5,"button",4),t.NdJ("click",function(){const s=t.CHM(e).$implicit;return t.oxw().deleteCategory(s.id)}),t._uU(6,"Delete"),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=r.$implicit;t.xp6(3),t.Oqu(t.lcZ(4,1,e.name))}}const j=[{path:"",component:J},{path:"create",component:Z},{path:"edit/:id",component:Z},{path:"categories",component:(()=>{class o{constructor(e){this.categoriesService=e,this.subscriptions=[],this.categories=[],this.newCategoryValue=""}ngOnInit(){this.populateCategories()}populateCategories(){this.subscriptions.push(this.categoriesService.getCategories().subscribe(e=>{this.categories=e}))}deleteCategory(e){this.categoriesService.deleteCategory(e).subscribe(()=>{this.categories=this.categories.filter(n=>n.id!==e)})}createCategory(){this.categoriesService.createCategory(this.newCategoryValue).subscribe(e=>{this.categories.push(e),this.newCategoryValue=""})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(h))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-categories"]],decls:6,vars:2,consts:[[1,"categories"],["class","card mt-3",4,"ngFor","ngForOf"],[1,"newCategory"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],[1,"btn","btn-primary",3,"click"],[1,"card","mt-3"],[1,"card-body"],[1,"card-title"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.YNc(1,L,7,3,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"input",3),t.NdJ("ngModelChange",function(s){return n.newCategoryValue=s}),t.qZA(),t.TgZ(4,"button",4),t.NdJ("click",function(){return n.createCategory()}),t._uU(5,"Create"),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngForOf",n.categories),t.xp6(2),t.Q6J("ngModel",n.newCategoryValue))},directives:[u.sg,c.Fj,c.JJ,c.On],pipes:[u.rS],styles:[".categories[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.categories[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:50%;box-shadow:1px 1px 10px 2px #d6d3d3bf}.categories[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.categories[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#f55b5b;outline:none;border:none}.categories[_ngcontent-%COMP%]   .newCategory[_ngcontent-%COMP%]{margin-top:20px;display:flex;gap:10px}"]}),o})()}];let G=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[u.ez,d.Bz.forChild(j)],d.Bz]}),o})();var H=p(294);let E=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[u.ez,G,c.u5,H.I]]}),o})()}}]);