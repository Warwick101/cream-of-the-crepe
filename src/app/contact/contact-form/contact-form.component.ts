import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})

export class ContactFormComponent implements OnInit, OnDestroy {

  // @Input() queenForm: FormGroup;
  @Input() phoneValue: string = '';
  // @ViewChild(FormGroupDirective, { static: true }) formGroupDirective: FormGroupDirective;

  // form: FormGroup;
  alertMessage = 'default';
  alertIcon = 'default';
  // sendMessage = false;
  messageTrigger = false;
  // statusSubscription: Subscription;
  datePipeEn: DatePipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    // this.queenForm = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   surname: new FormControl(null, [Validators.required]),
    //   phone: new FormControl(null, Validators.maxLength(20)),
    //   email: new FormControl(null, [Validators.required]),
    //   patientMessage: new FormControl(null, [Validators.required]),
    // });
  }

  onSubmit() {
    // const emailData = {
    //   name: this.queenForm.get('name').value,
    //   surname: this.queenForm.get('surname').value,
    //   phone: this.queenForm.get('phone').value,
    //   email: this.queenForm.get('email').value,
    //   emailDate: new Date(),
    //   messageTitle: `New message from ${this.queenForm.get('name').value + ' ' +  this.queenForm.get('surname').value}`,
    //   adminStatus: 'website',
    //   messageType: 'contact',
    //   messageSubject: 'Website Message',
    //   status: 'siteSent',
    //   sendTo: 'war.wick101@gmail.com',
    //   patient: null,
    // };
    // this.messageAnimation();
  }

  // Refactored this is as a component

  // messageAnimation() {
  //   this.sendMessage = true;
  //     setTimeout(() => {
  //       this.sendMessage = false;
  //     }, 4000);
  // }

  // Initially used states that changed programmatically
  //
  // messageAnimation() {
  //   this.alertMessage = 'submitted';
  //
  //   setTimeout(() => {
  //     this.alertIcon = 'submitted';
  //   }, 300);
  //
  //   setTimeout(() => {
  //     this.alertMessage = 'submittedEnd';
  //   }, 3000);
  // }
  //
  // getMessageStyle(): string {
  //   if (this.alertMessage == 'submitted') {
  //     return 'alerted-message'
  //   }
  //   else {
  //     return '';
  //   }
  // }

  isInvalidEmail = () => {
    // return this.queenForm.errors && this.queenForm.errors.isInvalidEmail;
  }

  ngOnDestroy(): void {
    // this.statusSubscription.unsubscribe();
  }
}

