import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';
import {
  WdkBannerComponentData,
  WdkBannerService,
  WdkBannerType
} from "@wjdk/acl";


@Component({
  selector: 'app-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})

export class ContactFormComponent implements OnInit, OnDestroy {

  // @Input() queenForm: FormGroup;
  @Input() phoneValue: string = '';
  // @ViewChild(FormGroupDirective, { static: true }) formGroupDirective: FormGroupDirective;

  error = WdkBannerType.Error;
  info = WdkBannerType.Info;
  success = WdkBannerType.Success;
  warning = WdkBannerType.Warning;
  data: WdkBannerComponentData;

  contactForm: FormGroup;
  datePipeEn: DatePipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, private bannerService: WdkBannerService ) {

    this.contactForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      message: new FormControl(''),
    })
  }

  ngOnInit() {

  }


  onSubmit() {
    const emailData: any = {
    };
    console.log(this.contactForm);
    console.log(emailData);
    // this.messageAnimation();
    this.sendBanner(this.success)
  }

  sendBanner(alert: WdkBannerType) {
    this.data = {
      bannerType: alert,
      bodyDetails: 'This is some additional information for new portal banner.',
      closeCallBack: this.close,
      headline: 'This is custom headline',
      body: 'This is custom body',
      outletId: '#banner',
    };
    this.bannerService.sendAlert(this.data);
  }

  close = () => {
    // provide product specific cleanup code and then call BannerService close method
    this.bannerService.close();
  }


  ngOnDestroy(): void {
    // this.statusSubscription.unsubscribe();
  }
}

