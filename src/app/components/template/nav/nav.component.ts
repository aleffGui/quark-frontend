import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Input() role : any;

  constructor(private tokenService: TokenService, private router: Router) {}

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
