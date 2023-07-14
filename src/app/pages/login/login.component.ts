import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  username: string = 'admin';
  password: string = 'admin';

  isValid: boolean = false;

  showError(){
    this.isValid = true;
    let timer = setTimeout(() => {
      this.isValid = false;
    }, 3000);
  }

  submitForm(loginForm: any) {
    if (loginForm.valid) {
      const isAuthenticated = this.authService.authenticate(this.username, this.password);

      if (isAuthenticated) {
        this.router.navigate(['/kanban']);
      } else {
        this.showError();
      }
    }
    else{
      this.showError();
    }
  }
}