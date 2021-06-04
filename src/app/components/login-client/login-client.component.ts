import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/loginservice/login-service.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {
  form: FormGroup;
  loginInvalid: boolean;

  constructor(
    private router: Router,
    private loginservice : LoginServiceService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  checkLogin() {
    console.log(this.username.value);
    this.loginservice
      .authentificate(this.username.value, this.password.value)
      .subscribe(
        (data) => {
          this.loginInvalid = false;
          this.router.navigate(['/overview']);
        },
        (error) => {
          this.loginInvalid = true;
        }
      );
  }

}
