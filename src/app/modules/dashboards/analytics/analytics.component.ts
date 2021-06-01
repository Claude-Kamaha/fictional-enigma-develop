import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor() { }
  headers = ["Username", "Email", "Password", "Phone number", "Country","Referrer"];
  ngOnInit(): void {
  }

}
