import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss',
  "../../../assets/lib/gritter/css/jquery.gritter.css",
  "../../../assets/lib/bootstrap/css/bootstrap.min.css",
  "../../../assets/lib/font-awesome/css/font-awesome.css",
  "../../../assets/css/zabuto_calendar.css",
  "../../../assets/css/style.css",
  "../../../assets/css/style-responsive.css",
  


]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.clear()
    console.log("loggeed out")
  }
}
