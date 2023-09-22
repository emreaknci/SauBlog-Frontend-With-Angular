import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { WriterModule } from './writer/writer.module';
import { DialogModule } from 'src/app/components/dialog/dialog.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminModule,
    WriterModule,
    DialogModule
  ]
})
export class AuthorizationMenuModule { }
