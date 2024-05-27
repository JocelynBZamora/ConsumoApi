import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyFakeStoreServiceService } from '../my-fake-store-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product: any = {
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  };

  constructor(
    private route: ActivatedRoute,
    private fakestoreService: MyFakeStoreServiceService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.fakestoreService.getProducto(id).subscribe(data => {
      this.product = data;
    });
  }
}
