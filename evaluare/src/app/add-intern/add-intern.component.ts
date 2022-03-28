import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intern } from '../modules/intern/models/intern';

@Component({
  selector: 'app-add-intern',
  templateUrl: './add-intern.component.html',
  styleUrls: ['./add-intern.component.scss'],
})
export class AddInternComponent implements OnInit {
  internId = null;

  constructor(private _activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this._activeRoute.firstChild !== null) {
      this.internId = this._activeRoute.firstChild.snapshot.params['internId'];
    }
  }
}
