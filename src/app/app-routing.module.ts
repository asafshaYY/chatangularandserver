import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatlobbyComponent } from './components/chatlobby/chatlobby.component';

const routes : Routes = [
  {path: '', component:LoginComponent},
  {path:'lobby', component:ChatlobbyComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
