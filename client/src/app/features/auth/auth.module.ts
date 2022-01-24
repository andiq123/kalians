import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, CoreModule],
})
export class AuthModule {}
