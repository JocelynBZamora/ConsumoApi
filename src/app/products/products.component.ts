import { Component, OnInit } from '@angular/core';
import { MyFakeStoreServiceService } from '../my-fake-store-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private fakestoreService: MyFakeStoreServiceService) { }

  ngOnInit(): void {
    this.fakestoreService.getProductos().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
    this.fakestoreService.getCategorias().subscribe(data =>{
      console.log("CATEGORIAS:");
      console.log(data);
      sessionStorage.setItem("categorias",JSON.stringify(data));//descarga las categorias y guarda
    });
  }

  deleteProduct(id: number): void {
    this.fakestoreService.deleteProducto(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
