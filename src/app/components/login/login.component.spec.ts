import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../services/app-service.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: any;
  let mockToastrService: any;
  let mockAppService: any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    mockToastrService = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
      info: jasmine.createSpy('info'),
    };
    mockAppService = {
      getLoginData: jasmine.createSpy('getLoginData').and.returnValue(
        of([
          { email: 'test@example.com', password: 'password123' },
          { email: 'user@example.com', password: 'user123456' },
        ])
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: AppService, useValue: mockAppService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and fetch login data on init', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.registorForm).toBeDefined();
    expect(mockAppService.getLoginData).toHaveBeenCalled();
    expect(component.loginData).toEqual([
      { email: 'test@example.com', password: 'password123' },
      { email: 'user@example.com', password: 'user123456' },
    ]);
  });

  it('should login successfully with valid credentials', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.login();
    expect(component.isExistuser).toBeTruthy();
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Sucess',
      'Login Sucessfully!!'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
    expect(localStorage.getItem('isLogin')).toBe('true');
  });

  it('should fail login with invalid credentials', () => {
    component.loginForm.setValue({
      email: 'invalid@example.com',
      password: 'wrongpassword',
    });
    component.login();
    expect(component.isExistuser).toBeFalsy();
    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Failed',
      'Login Failed!!'
    );
  });

  it('should toggle between login and register forms', () => {
    component.isLogIn = true;
    component.onRegistor();
    expect(component.isLogIn).toBeFalse();

    component.onRegistor();
    expect(component.isLogIn).toBeTrue();
  });

  it('should register a new user', () => {
    component.registorForm.setValue({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'newuser123',
    });
    component.onSubmitReg();
    expect(component.isLogIn).toBeFalse();
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Sucess',
      'Register Sucessfully!!'
    );
    expect(component.loginData).toContain({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'newuser123',
    });
    expect(localStorage.getItem('loginData')).toContain(
      '"email":"newuser@example.com"'
    );
  });

  it('should reset forms on registration cancel', () => {
    spyOn(component.loginForm, 'reset');
    spyOn(component.registorForm, 'reset');
    spyOn(component.registorForm, 'updateValueAndValidity');
    component.registorCancelClick();
    expect(component.isLogIn).toBeFalse();
    expect(component.loginForm.reset).toHaveBeenCalled();
    expect(component.registorForm.reset).toHaveBeenCalled();
    expect(component.registorForm.updateValueAndValidity).toHaveBeenCalled();
  });

  it('should check if email already exists during registration', () => {
    component.registorForm.get('email')?.setValue('test@example.com');
    component.isEmailAlreadyEixst();
    expect(component.isMailIdAvailable).toBeTrue();
    expect(component.registorForm.get('email')?.value).toBe('');
    expect(mockToastrService.info).toHaveBeenCalledWith(
      'Information',
      'mail exist try with other mail Id !!'
    );
  });

  it('should allow new email during registration', () => {
    component.registorForm.get('email')?.setValue('newemail@example.com');
    component.isEmailAlreadyEixst();
    expect(component.isMailIdAvailable).toBeFalse();
  });
});
