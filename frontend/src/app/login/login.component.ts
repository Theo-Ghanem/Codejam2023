import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ProgressSpinnerModule]
})
export class LoginComponent implements OnInit {
  isLoading = false; 
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
  this.isLoading = true;
  setTimeout(() => {
    this.router.navigate(['/profile']);
    this.isLoading = false;
  }, 3000); // 3000ms delay
}

}