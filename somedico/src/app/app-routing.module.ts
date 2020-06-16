import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'supplier',
    loadChildren: () => import('./pages/supplier/supplier.module').then( m => m.SupplierPageModule)
  },
  {
    path: 'point-of-sale',
    loadChildren: () => import('./pages/point-of-sale/point-of-sale.module').then( m => m.PointOfSalePageModule)
  },
  {
    path: 'edit-product-modal',
    loadChildren: () => import('./shared/modals/edit-product-modal/edit-product-modal.module').then( m => m.EditProductModalPageModule)
  },
  {
    path: 'confirmation-modal',
    loadChildren: () => import('./shared/modals/confirmation-modal/confirmation-modal.module').then( m => m.ConfirmationModalPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./pages/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  {
    path: 'order-details/:orderId',
    loadChildren: () => import('./pages/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'add-supplier',
    loadChildren: () => import('./pages/add-supplier/add-supplier.module').then( m => m.AddSupplierPageModule)
  },
  {
    path: 'edit-supplier-modal',
    loadChildren: () => import('./shared/modals/edit-supplier-modal/edit-supplier-modal.module').then( m => m.EditSupplierModalPageModule)
  },
  {
    path: 'warning-modal',
    loadChildren: () => import('./shared/modals/warning-modal/warning-modal.module').then( m => m.WarningModalPageModule)
  },
  {
    path: 'stock-update',
    loadChildren: () => import('./pages/stock-update/stock-update.module').then( m => m.StockUpdatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
