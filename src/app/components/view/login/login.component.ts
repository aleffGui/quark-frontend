import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private tokenService: TokenService, private router: Router) {

    this.loginForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  
  ngOnInit(): void {
   
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((response) => {
        if(response) {
          this.tokenService.setToken(response);
          this.router.navigate(['']);
        }
    })
  }

}
