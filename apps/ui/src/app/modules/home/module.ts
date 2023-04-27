import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './app-routing.module';
import { FolderOpenerComponent } from './components/folder-opener/folder-opener.component';
import { HistoryComponent } from './components/history/history.component';
import { OpenerComponent } from './components/opener/opener.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [HomeComponent, FolderOpenerComponent, HistoryComponent, OpenerComponent],
  imports: [CommonModule, SharedModule, ClarityModule, HomeRoutingModule],
})
export class HomeModule {}
