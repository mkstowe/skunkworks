import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;
  public loggedIn?: boolean;
  private password = '';

  ngOnInit(): void {
    this.auth.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (this.loggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  public onLogin() {
    this.password = this.passwordInput.nativeElement.value;
    this.auth.login(this.password).subscribe((success) => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        alert('Incorrect password');
      }
    });
  }
}
