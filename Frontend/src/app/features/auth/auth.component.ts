import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  public isAuthenticated = false;
  public isLoading = false;
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void { 
    this.authService.checkAuthentication().subscribe((res) => {
      this.isAuthenticated = res;
      if (this.isAuthenticated) {
        this.isLoading = true;
        setTimeout(() => {
          this.router.navigate(['/productes']);
        }, 1000);
      } else {
        this.isLoading = false;
        this.router.navigate(['/']);
      } 
    });
  }

  login() {
    if (this.email === '' && this.password === '') {
      alert('Please enter your email and password');
      return;
    }
    if (this.email === '') {
      alert('Please enter your email');
      return;
    }
    if (this.password === '') {
      alert('Please enter your password');
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Handle successful login, e.g., redirect to another page
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login error, e.g., show an error message
      });

  }
}
