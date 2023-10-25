import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup;
  public loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private tokenService: TokenService, private router: Router, private toastService:ToastrService) {

    this.loginForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  
  ngOnInit(): void {
   
  }

  validateForm() {
    if(this.loginForm.valid) {
      this.login()
    } else {
      for (const controlName in this.loginForm.controls) {
        if (this.loginForm.controls[controlName].invalid) {
          this.loginForm.controls[controlName].markAsTouched();
        }
      }
    }
  }
  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe((response) => {
        if(response) {
          this.loading = false;
          this.tokenService.setToken(response.body.token);
          this.router.navigate(['/home']);
        }
    }, err => {
      this.loading = false;
      this.toastService.error("Algum erro ocorreu", '', {positionClass: 'toast-bottom-center'});
    })
  }

}
