import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { AdminPage } from './pages/admin-page/admin-page';
import { Cart } from './pages/cart/cart';
import { ProductCrud } from './pages/product-crud/product-crud';
import { AboutUs } from './pages/about-us/about-us';
import { ProductRegister } from './pages/product-register/product-register';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'admin-page', component: AdminPage },
    { path: 'cart', component: Cart },
    { path: 'product-crud', component: ProductCrud },
    { path: 'about-us', component: AboutUs },
    { path: 'product-register', component: ProductRegister },
    { path: 'product-register/:id', component: ProductRegister },
];
