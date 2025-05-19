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
  public nom: string = '';
  public email: string = '';
  public password: string = '';
  public confirm_password: string = '';
  public mostrarLogin = true;

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
      },
      (error) => {
        console.error('Login failed', error);
      });

  }

  register () {
    if (this.nom === '' && this.email === '' && this.password === '' && this.confirm_password === '') {
      alert('Please enter your name, email, password and confirm password');
      return;
    }
    if (this.nom === '') {
      alert('Please enter your name');
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
    if (this.confirm_password === '') {
      alert('Please enter your confirm password');
      return;
    }
    if (this.password !== this.confirm_password) {
      alert('Passwords do not match');
      return;
    }
    this.authService.register({ nom: this.nom, email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log('Register successful', response);
      },
      (error) => {
        console.error('Register failed', error);
      });
  }

  

cambiarVista() {
  this.mostrarLogin = !this.mostrarLogin;
}
}
