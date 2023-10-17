import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user?:any;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.user = this.tokenService.decodeToken(this.tokenService.getToken())
  }


}
