import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }


   login(user , pass) {

    if( user ==="admin" && pass === "admin" ) {

      this.route.navigate(['/nav']);

    } else {
      alert('vérifiez vos informations');
    }
   }
}
