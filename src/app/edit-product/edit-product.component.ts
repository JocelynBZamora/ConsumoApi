import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyFakeStoreServiceService } from '../my-fake-store-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'] // Corregido a styleUrls
})
export class EditProductComponent implements OnInit {
  categorias: any;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.fakestoreService.getProducto(id).subscribe(data => {
      // Asignamos los valores recibidos del servicio a los controles del formulario
      this.productForm.patchValue({
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        categoryId: data.categoryId
      });
      console.log(data);
    });
    this.categorias = JSON.parse(sessionStorage.getItem("categorias") ?? '[]');
  }

  updateProduct(): void {
    if(this.productForm.valid){
      const productData = {
        ...this.productForm.value,
        images: [this.productForm.value.image] // Convertimos la URL en un array
      };
      console.log(productData);
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.fakestoreService.updateProducto(id, productData).subscribe(data => { // Enviamos productData
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
