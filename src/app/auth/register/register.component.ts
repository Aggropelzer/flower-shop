import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HeaderTitleService} from '../../shared/services/header-title.service';
import {fallIn, moveIn} from '../../router.animations';
import {FirebaseService} from '../../shared/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [moveIn(), fallIn()],
})
export class RegisterComponent implements OnInit {
  max: Date;
  min: Date;
  state: string;
  error = false;
  isLoading = false;
  constructor(private headerTitleService: HeaderTitleService,
              private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.max = new Date();
    this.min = new Date();
    this.max.setFullYear(this.max.getFullYear() - 16);
    this.min.setFullYear(this.max.getFullYear() - 100);
    this.headerTitleService.setTitle('Register');
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.firebaseService.registerUser({
      email: form.value.email,
      password: form.value.password
    }).then(()  => {
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
    });
  }
}
