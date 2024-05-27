import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyFakeStoreServiceService } from '../my-fake-store-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private fakestoreService: MyFakeStoreServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.fakestoreService.getProducto(id).subscribe(data => {
      this.product = data;
    });
  }

  updateProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.fakestoreService.updateProducto(id, this.product).subscribe(data => {
      this.router.navigate(['/products']);
      console.log(data);
  });
}
}
