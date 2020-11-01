import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './providers/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBoardModalComponent } from './components/add-board-modal.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ApiService],
  entryComponents: [AddBoardModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
