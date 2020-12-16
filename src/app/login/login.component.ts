import {Component, OnInit} from '@angular/core';


import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorComponent} from '../error/error.component';
import {AuthGuardService} from '../service/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';

  // public errorDialogRef: MatDialogRef<ErrorComponent>;

  constructor(private dialog: MatDialog, private router: Router, private auth: AuthGuardService) {
  }

  ngOnInit() {
  }

  login() {
    if (this.username === 'demo' && this.password === 'demo') {
      this.auth.validAuthenticated();
      this.router.navigate(['product-list']);
    } else {

      this.dialog.open(ErrorComponent, {
        data: {
          message: 'Your login information are incorrect!'
        }
      });
    }
  }
}
