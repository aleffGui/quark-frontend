import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
 role:any;

 constructor(private tokenService: TokenService) {}
 
  ngOnInit(): void {
    this.role = this.tokenService.decodeToken(this.tokenService.getToken()).role;
  }

}
