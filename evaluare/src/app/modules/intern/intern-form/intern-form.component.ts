import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Intern } from '../models/intern';
import { InternService } from '../services/intern.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-intern-form',
  templateUrl: './intern-form.component.html',
  styleUrls: ['./intern-form.component.scss'],
})
export class InternFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  titlu: string = 'Adaugare';
  @Input() internId = null;
  intern: Intern = null;

  constructor(
    private _fb: FormBuilder,
    private _internService: InternService,
    private _router: Router,
    private _notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.initInterface();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.internId !== null)
      this._internService.getInterById(this.internId).subscribe((intern) => {
        this.intern = intern;
        this.initInterface();
      });
  }

  initInterface() {
    this.form = this._fb.group({
      firstName: [
        this.intern !== null ? this.intern.firstName : '',
        [Validators.required],
      ],
      lastName: [
        this.intern !== null ? this.intern.lastName : '',
        [Validators.required],
      ],
      email: [
        this.intern !== null ? this.intern.email : '',
        [Validators.email],
      ],
      birthDate: [
        this.intern !== null ? this.intern.birthDate : '',
        [Validators.required],
      ],
    });
    if (this.intern !== null) this.titlu = 'Modificare';
  }

  submit() {
    if (this.internId === null) this.createIntern();
    else this.updateIntern();
    this._router.navigateByUrl('/');
  }

  createIntern() {
    const newIntern: Intern = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      birthDate: this.form.value.birthDate.toISOString(),
    };

    this._internService.createIntern(newIntern).subscribe({
      next: () => {
        this._notify.openSnackbar('Intern added.');
      },
    });
  }

  updateIntern() {
    const newIntern: Intern = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      birthDate: this.form.value.birthDate,
    };

    this._internService.updateIntern(this.internId, newIntern).subscribe({
      next: () => {
        this._notify.openSnackbar('Intern updated.');
      },
    });
  }

  validateField(fieldName: string, errorName: string) {
    return (
      this.form.get(fieldName).invalid &&
      this.form.get(fieldName).errors &&
      (this.form.get(fieldName).dirty || this.form.get(fieldName).touched) &&
      this.form.get(fieldName).hasError(errorName)
    );
  }
}
