import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Intern } from '../models/intern';
import { InternService } from '../services/intern.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss'],
})
export class InternTableComponent implements OnInit, OnChanges {
  _interns: Intern[] = [];
  _displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'actions',
  ];

  sortare: string = 'Crescator';

  selectedFormat = 'fullDate';
  dropdownOptions = [
    {
      name: 'Monday, June 15, 2015',
      value: 'fullDate',
    },
    {
      name: 'Jun 15, 2015',
      value: 'mediumDate',
    },
    {
      name: '6/15/15',
      value: 'shortDate',
    },
  ];

  constructor(
    private _internService: InternService,
    private _notify: NotifyService
  ) {}

  ngOnInit(): void {
    this._internService
      .getInterns()
      .subscribe((interns) => (this._interns = interns));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  deleteIntern(id: string) {
    this._internService.deleteIntern(id).subscribe({
      next: () => {
        this._notify.openSnackbar('Intern deleted.');
      },
    });
  }

  toggleSortare() {
    console.log(this._interns);
    this.sortare = this.sortare === 'Crescator' ? 'Descrescator' : 'Crescator';
    this._interns = [
      ...this._interns.sort((a, b) =>
        this.sortare === 'Crescator'
          ? a.firstName.localeCompare(b.firstName)
          : a.firstName.localeCompare(b.firstName) * -1
      ),
    ];
  }
}
