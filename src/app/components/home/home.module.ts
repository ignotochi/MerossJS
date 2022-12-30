import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { RouterModule, Routes } from "@angular/router";
import { CommonComponentModules } from "../components.module";
import { MerossHome } from "./meross-home.component";


const routes: Routes = [ { path: '', component: MerossHome} ]; 

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonComponentModules
    ],
    declarations: [
      MerossHome
    ],
  providers: [RouterModule],
  exports: [RouterModule]
})
export class MerossHomeModule { }
