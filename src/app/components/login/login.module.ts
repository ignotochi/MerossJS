import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { RouterModule, Routes } from "@angular/router";
import { CommonComponentModules } from "../components.module";
import { MerossLogin } from "./meross-login.component";


const routes: Routes = [ { path: '', component: MerossLogin} ]; 

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonComponentModules,
      MatGridListModule,
    ],
    declarations: [
      MerossLogin
    ],
  providers: [RouterModule],
  exports: [RouterModule]
})
export class MerossLoginModule { }
