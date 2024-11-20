import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../services/app-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  registorForm!: FormGroup;
  isLogIn: boolean = true;
  isExistuser: boolean = true;
  loginData: any;
  isMailIdAvailable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegistorForm();
    this.appService.getLoginData().subscribe((res) => {
      sessionStorage.setItem('loginData', JSON.stringify(res));
      this.loginData = sessionStorage.getItem('loginData');
      this.loginData = JSON.parse(this.loginData);
    });
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  createRegistorForm(): void {
    this.registorForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(): void {
    this.isExistuser = this.loginData
      ? this.loginData.find(
          (ele: { email: any; password: any }) =>
            ele.email === this.loginForm.getRawValue().email &&
            ele.password === this.loginForm.getRawValue().password
        )
      : false;
    if (this.isExistuser) {
      this.toastr.success('Sucess', 'Login Sucessfully!!');
      sessionStorage.setItem('isLogin', 'true');
      this.router.navigate(['/list']);
    } else {
      this.toastr.error('Failed', 'Login Failed!!');
    }
  }

  onRegistor(): void {
    this.isLogIn = !this.isLogIn;
  }

  onSubmitReg(): void {
    this.isLogIn = !this.isLogIn;
    this.loginData.push(this.registorForm.value);
    sessionStorage.removeItem('loginData');
    sessionStorage.setItem('loginData', JSON.stringify(this.loginData));
    this.toastr.success('Sucess', 'Register Sucessfully!!');
  }

  registorCancelClick(): void {
    this.isLogIn = !this.isLogIn;
    this.loginForm.reset();
    this.registorForm.reset();
    this.registorForm.updateValueAndValidity();
  }

  isEmailAlreadyEixst() {
    let enteredMail = this.registorForm.get('email')?.value;
    let isExist = this.loginData.find((ele: any) => ele.email == enteredMail);
    console.log(isExist);
    this.isMailIdAvailable = isExist ? true : false;
    this.registorForm.get('email')?.setValue('');
    if (this.isMailIdAvailable) {
      this.toastr.info('Information', 'mail exist try with other mail Id !!');
    }
  }
}
