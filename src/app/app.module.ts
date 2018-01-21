import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
//import { AuthModule } from './core/auth.module';
import { AuthService } from './core/auth.service';


import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { AuthGuard } from './core/auth.guard';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NeuesSpielComponent } from './neues-spiel/neues-spiel.component';
import { SeatingOrderComponent } from './seating-order/seating-order.component';





const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'neues-spiel', component: NeuesSpielComponent },
  { path: 'seating-order', component: SeatingOrderComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NeuesSpielComponent,
    SeatingOrderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
