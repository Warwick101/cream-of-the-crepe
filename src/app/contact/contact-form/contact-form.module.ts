import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactFormComponent} from './contact-form.component';

@NgModule({

  declarations: [
    ContactFormComponent
  ],
  imports: [
    ReactiveFormsModule,
  ],
  exports: [
    ContactFormComponent],
  providers: [],
})

export class ContactFormModule { }
