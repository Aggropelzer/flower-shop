import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() toggleNavEvent = new EventEmitter();
  userStatus = false;
  authSubscription: Subscription;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.updateUserStatus();
  }
  onToggle() {
    this.toggleNavEvent.emit();
  }
  onLogout() {
    this.firebaseService.logoutUser();
    this.userStatus = false;
    this.onToggle();
  }
  updateUserStatus() {
    this.authSubscription = this.firebaseService.authChanged.subscribe(authStatus => {
      this.userStatus = authStatus;
    });
    /*
    this.firebaseService.getUserStatus().subscribe(
      (res) => {
        this.userStatus = res;
      }
    );
    */
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
