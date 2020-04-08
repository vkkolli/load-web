import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoadBoardService } from './shared/service/load-board.service';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryService } from './core/services/repository.service';
import { CreateLoadService } from './module/load/component/load-details/shared/service/create-load.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [LoadBoardService, CreateLoadService, RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
