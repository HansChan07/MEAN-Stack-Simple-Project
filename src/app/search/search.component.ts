import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  model: any = {};
  error = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onPostAd() {
      // reset login status
      this.router.navigate(['/postad']);
  }

  onSearch(f: NgForm) {
      // reset login status
      // console.log(f.value);
      // console.log(f.valid);
      this.router.navigate(['/posts']);
  }
}
