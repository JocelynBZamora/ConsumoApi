import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyFakeStoreServiceService } from '../my-fake-store-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categorias: any;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fakestoreService: MyFakeStoreServiceService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png)/)]], // Validar URL de imagen
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categorias = JSON.parse(sessionStorage.getItem("categorias") ?? '[]');
  }

  createProduct(): void {
    if (this.productForm.valid) {
      // Convertir el campo de imagen en un array de URLs
      const productData = {
        ...this.productForm.value,
        images: [this.productForm.value.image] // Convertimos la URL en un array
      };
      console.log(productData);
      this.fakestoreService.createProducto(productData).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }
}
