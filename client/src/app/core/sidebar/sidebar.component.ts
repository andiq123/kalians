import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isClosed: boolean = true;
  @Output() close = new Subject<void>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  signOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }
}
