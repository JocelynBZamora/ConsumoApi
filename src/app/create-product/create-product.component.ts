import { Component, OnInit } from '@angular/core';
import { MyFakeStoreServiceService } from '../my-fake-store-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})

export class CreateProductComponent implements OnInit{
  categorias: any;
  product ={
    title:'',
    price: 0,
    description: '',
    image:'',
    categoryId:''
  };
  constructor(
    private fakestoreService: MyFakeStoreServiceService,
    private router: Router
  ) { }

  ngOnInit():void{
    this.categorias = JSON.parse(sessionStorage.getItem("categorias")??"");
  }
  createProduct(): void {
    console.log(this.product);
    this.fakestoreService.createProducto(this.product).subscribe(data => {
      console.log(data);
      //this.router.navigate(['/products']);
    });
  }

}
