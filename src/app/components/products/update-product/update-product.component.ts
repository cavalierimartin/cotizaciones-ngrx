import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Material } from 'src/app/models/material';
// import { MeasureUnits } from 'src/app/models/MeasureUnits';
import { Product } from 'src/app/models/product';
import { CategoriasService } from 'src/app/services/categories.service';
import { MaterialsService } from 'src/app/services/materials.service';
import { ProductsService } from 'src/app/services/products.service';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit, OnDestroy {

  loadingProduct = true;
  loadingCategories = true;
  loadingMaterials = true;
  loadingUnits = true;
  loading = this.loadingProduct || this.loadingCategories || this.loadingMaterials || this.loadingUnits;
  action: 'create' | 'update' = 'create';

  categories!: [Categoria];
  currentProduct!: Product;
  materials!: [Material];
  units!: [string];

  subscriptions = new Subscription();

  updateProductForm: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    nombre: ['', Validators.required],
    alias: ['',],
    categoria: ['',],
    denominacion: ['',],
    material: ['',],
    tipo: ['',],
    largo: ['',],
    unidadLargo: ['',],
    ancho: ['',],
    unidadAncho: ['',],
    alto: ['',],
    unidadAlto: ['',],
    espesor: ['',],
    unidadEspesor: ['',],
    diametro: ['',],
    unidadDiametro: ['',],
    variable: ['',],
    variableUnit: ['',]
  })

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriasService,
    private productService: ProductsService,
    private materialsService: MaterialsService,
    private unitsService: UnitsService
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['productId']) {
      this.action = 'update';
      this.getCategories();
      this.getMaterials();
      this.getUnits();
      this.getProduct(this.route.snapshot.params['productId']);
    } else {
      this.action = 'create';
      this.loadingCategories = false;
      this.loadingProduct = false;
      this.loadingMaterials = false;
      this.loadingUnits = false;
    }
  }

  getCategories() {
    this.loadingCategories = true;
    this.subscriptions.add(
      this.categoriesService.getAllCategories().subscribe({
        next: (categorias: [Categoria]) => {
          this.categories = categorias;
          this.loadingCategories = false;
        },
        error: (e: any) => {
          console.warn("Ocurrió un error al obtener las categorías", e)
          this.loadingCategories = false;
        }
      })
    )
  }

  getMaterials() {
    this.loadingMaterials = true;
    this.subscriptions.add(
      this.materialsService.getAllMaterials().subscribe({
        next: (materials) => {
          this.materials = materials;
          this.loadingMaterials = false;
        }, error: (e) => {
          console.warn("Ocurrió un error al oobtener los materiales", e)
          this.loadingMaterials = false;
        },
      })
    )
  }

  getUnits() {
    this.loadingUnits = true;
    this.subscriptions.add(
      this.unitsService.getAllUnits().subscribe({
        next: (units) => {
          this.units = units;
          this.loadingUnits = false;
        },
        error: (e) => {
          console.warn("Ocurrió un error al oobtener las unidades", e)
          this.loadingUnits = false;
        },
      })
    )
  }

  getProduct(productId: string) { //#FIXME: El seteo de todas las props del form, va a tener que esperar a que vuelvan todas las otras req
    this.productService.getProductById(productId).pipe(
      take(1)
    ).subscribe(product => {
      this.currentProduct = product;
      this.updateProductForm.controls['id'].setValue(product.id);
      this.updateProductForm.controls['nombre'].setValue(product.nombre);
      this.updateProductForm.controls['alias'].setValue(product.alias);
      if (product.categoria) {
        this.updateProductForm.controls['categoria'].setValue(this.categories.find(c => c.id === product.categoria)?.id); // #FEATURE: Agregar la lógica que corresponda
      }
      this.updateProductForm.controls['denominacion'].setValue(product.denominacion);
      if (product.materiales)
        this.updateProductForm.controls['material'].setValue(product.materiales[0]);// #FEATURE: Agregar la lógica que corresponda
      this.updateProductForm.controls['tipo'].setValue(product.tipo);
      this.updateProductForm.controls['largo'].setValue(product.medidas?.largo?.value);
      this.updateProductForm.controls['unidadLargo'].setValue(product.medidas?.largo?.unidad);
      this.updateProductForm.controls['ancho'].setValue(product.medidas?.ancho?.value);
      this.updateProductForm.controls['unidadAncho'].setValue(product.medidas?.ancho?.unidad);
      this.updateProductForm.controls['alto'].setValue(product.medidas?.alto?.value);
      this.updateProductForm.controls['unidadAlto'].setValue(product.medidas?.alto?.unidad);
      this.updateProductForm.controls['espesor'].setValue(product.medidas?.espesor?.value);
      this.updateProductForm.controls['unidadEspesor'].setValue(product.medidas?.espesor?.unidad);
      this.updateProductForm.controls['diametro'].setValue(product.medidas?.diametro?.value);
      this.updateProductForm.controls['unidadDiametro'].setValue(product.medidas?.diametro?.unidad);
      this.updateProductForm.controls['variable'].setValue(product.medidas?.variable?.value);
      this.updateProductForm.controls['variableUnit'].setValue(product.medidas?.variable?.unidad);
      this.loading = false;
    })
  }

  updateProduct() {
    console.log(this.updateProductForm.value);

    // #TODO: Este es el submit
    this.subscriptions.add(
      this.productService.updateProduct(this.updateProductForm.value).subscribe({
        next: (v) => {
          console.log('Producto actualizado con éxito', v)
        },
        error: (err) => {
          console.log('Ocurrió un error al intentar actualizar el producto', err);
        },
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
