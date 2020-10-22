import { Component, OnInit } from '@angular/core';

// PrimeNG API Start
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
// PRIMENG API END

import { Product } from './product';
import { ProductService } from './product.service';

import { UserAuthSerivce } from 'src/app/user-auth.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-tablecrud',
  templateUrl: './tablecrud.component.html',
  styleUrls: ['./tablecrud.component.scss']
})
export class TablecrudComponent implements OnInit {
  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  user: User;

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private userService: UserAuthSerivce) { }

  ngOnInit() {
      this.productService.getProducts().then(data => this.products = data);
      this.checkForUserChanges();
  }

  checkForUserChanges() {
    this.userService.user.subscribe(
      (data: User) => this.onSuccessGetUser(data),
      (err: any) => this.onError(err)
    );
  }

  onSuccessGetUser(user: User) {
    this.user = user;
  }

  onError(err: any) {
    console.log('err', err);
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts.includes(val));
              this.selectedProducts = null;
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }

  editProduct(product: Product) {
      this.product = {...product};
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => val.id !== product.id);
              this.product = {};
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( let i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
}
