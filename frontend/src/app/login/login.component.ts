import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    // Implement your login logic here
    if (this.username === 'example' && this.password === 'password') {
      // Successful login logic (redirect or perform actions)
      console.log('Login successful');
    } else {
      // Unsuccessful login logic (show error message, etc.)
      console.log('Invalid credentials');
    }
  }
}
