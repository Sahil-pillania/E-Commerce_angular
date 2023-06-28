import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: String = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('this is seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          console.log(this.menuType);

          this.menuType = 'user';
          console.log(this.menuType);
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.warn(element.value);
      this.product.searchProduct(element.value).subscribe((result: any) => {
        console.warn(result);
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
}
