import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from 'src/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private route: Router) {}

  ngOnInit(): void {}
  signUp(data: signUp): void {
    this.seller.userSignUp(data).subscribe((result) => {
      console.log('data returned', result);
      this.route.navigate(['seller-home']);
    });
  }
}
