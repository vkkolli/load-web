import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoadComponent } from "./container/load/load.component";
import { LoadBoardComponent } from "./container/load-board/load-board.component";
import { CreateLoadComponent } from "./container/create-load/create-load.component";

const routes: Routes = [
  {
    path: "",
    component: LoadComponent,
    children: [
      { path: "", component: LoadBoardComponent },
      { path: "create", component: CreateLoadComponent },
      { path: "view/:id", component: CreateLoadComponent },
      { path: "edit/:id", component: CreateLoadComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadRoutingModule {}
