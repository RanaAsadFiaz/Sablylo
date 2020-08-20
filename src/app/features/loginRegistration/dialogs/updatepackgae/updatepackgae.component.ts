import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HelperService} from 'src/app/services/common/helperService/helper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ElementOptions, Elements, ElementsOptions, StripeCardComponent, StripeService} from 'ngx-stripe';
import {LoginRegistrationService} from 'src/app/features/loginRegistration/services/LoginRegistrationService';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NavigationService} from 'src/app/features/navigation/services/navigation.service';
import {EntityUserData} from 'src/app/models/userEntityData.model';
import {User} from '../../../../models/user.model';
import {SettingService} from '../../../../services/common/settings/setting.service';

@Component({
  selector: 'app-updatepackgae',
  templateUrl: './updatepackgae.component.html',
  styleUrls: ['./updatepackgae.component.scss']
})
export class UpdatepackgaeComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  elements: Elements;
  loading: boolean = false;
  stripeForm: FormGroup;
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  entityUserData: EntityUserData;
  selectedEntity: any;
  currentUserData: User;

  constructor(
    public helperService: HelperService,
    private stripeService: StripeService,
    private formBuilder: FormBuilder,
    private loginService: LoginRegistrationService,
    private navService: NavigationService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<UpdatepackgaeComponent>,
    private settings: SettingService
  ) {
    this.settings.getActiveTheme().subscribe((res) => {
      if (res && res === 'dark-theme') {
        this.cardOptions.style.base.color = '#FFF';
      }
    })
  }

  ngOnInit() {
    this.navService.currentUserData.subscribe((res) => {
      if (res) {
        this.currentUserData = res;
      }
    });
    this.stripeForm = this.formBuilder.group({
      email: [{value: this.currentUserData.email, disabled: true}]
    });
  }

  get formValidation() {
    return this.stripeForm.controls;
  }

  buy(stripeForm: FormGroup) {
    this.loading = true;
    if (!stripeForm.valid) {
      this.loading = false;
      this.helperService.createSnack('Please enter required details first.', this.helperService.constants.status.ERROR);
      return;
    }
    this.stripeService.createToken(this.card.getCard(), stripeForm.value.email).subscribe((res) => {
      if (res.token) {
        let data = {
          stripeToken: res.token.id,
          amount: parseInt(this.data.price, 10),
          email: stripeForm.value.email
        };
        this.loginService.updateAmount(data).subscribe((res) => {
          if (res && res.responseDetails.code === this.helperService.appConstants.codeValidations[0]) {
            this.updatePackage();
          } else {
            this.dialogRef.close('NO');
            this.helperService.createSnack(res.responseDetails.message, this.helperService.constants.status.ERROR);
            this.loading = false;
          }
        }, (error) => {
          this.dialogRef.close('NO');
          this.helperService.createSnack(this.helperService.translated.MESSAGES.ERROR_MSG,
            this.helperService.constants.status.ERROR);
          this.loading = false;
        });

      }

    }, (error) => {
      this.dialogRef.close('NO');
      this.helperService.createSnack(error.message, this.helperService.constants.status.ERROR);
    });
  }

  updatePackage() {
    let data = {
      'oldPackage': this.data.oldPackage,
      'package': this.data.package,
      'price': this.data.price
    };
    this.loginService.updatePackage(data).subscribe((res) => {
        if (res && res.responseDetails.code === this.helperService.appConstants.codeValidations[0]) {
          this.helperService.createSnack(res.responseDetails.message, this.helperService.constants.status.SUCCESS);
          this.navService.updatePackageInfo(res.data);
          this.loading = false;
          this.dialogRef.close('YES');
        } else {
          this.loading = false;
          this.dialogRef.close('NO');
        }
      }, (error) => {
        this.dialogRef.close('NO');
        this.helperService.createSnack(this.helperService.translated.MESSAGES.ERROR_MSG, this.helperService.constants.status.ERROR);
        this.loading = false;
      }
    );
  }


}
