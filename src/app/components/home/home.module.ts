import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonComponentModules } from "../components.module";
import { MerossHome } from "./meross-home.component";
import { SharedModule } from "src/app/shared.module";
import { LoadMerossDevice } from "../device/device-load/device-load.component";

const routes: Routes = [ { path: '', component: MerossHome} ]; 

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonComponentModules,
      LoadMerossDevice,
      SharedModule
    ],
    declarations: [
      MerossHome,
    ],
  providers: [RouterModule],
  exports: [RouterModule]
})

export class MerossHomeModule { }
