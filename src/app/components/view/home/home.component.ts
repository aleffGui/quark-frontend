import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user?:any;

  constructor(private tokenService: TokenService, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.tokenService.decodeToken(this.tokenService.getToken())
    this.userService.user = this.user;
  }


}
