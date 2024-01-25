import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { RouterModule, Routes } from "@angular/router";
import { CommonComponentModules } from "../components.module";
import { MerossLogin } from "./meross-login.component";
import { SharedModule } from "src/app/shared.module";

const routes: Routes = [ { path: '', component: MerossLogin} ]; 

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonComponentModules,
      MatGridListModule,
      SharedModule
    ],
    declarations: [
      MerossLogin,
    ],
  providers: [RouterModule],
  exports: [RouterModule]
})

export class MerossLoginModule { }
