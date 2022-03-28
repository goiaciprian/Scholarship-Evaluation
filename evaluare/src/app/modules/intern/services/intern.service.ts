import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InternModule } from '../intern.module';
import { Intern } from '../models/intern';

@Injectable({
  providedIn: 'root',
})
export class InternService {
  private readonly _base: string = 'https://localhost:44308/api/interns';

  private _interns: BehaviorSubject<Intern[]> = new BehaviorSubject<Intern[]>(
    []
  );

  constructor(private _client: HttpClient) {}

  public getInterns() {
    this._client
      .get<Intern[]>(this._base)
      .subscribe((interns) => this._interns.next(interns));
    return this._interns;
  }

  public getInterById(id: string) {
    return this._client.get<Intern>(this._base + `/${id}`);
  }

  public createIntern(intern: Intern) {
    this._client.post<Intern>(this._base, intern).subscribe((intern) => {
      const interns = [...this._interns.getValue()];
      interns.push(intern);
      this._interns.next(interns);
    });
    return this._interns;
  }

  public updateIntern(id: string, intern: Intern) {
    this._client
      .put<Intern>(this._base + `/${id}`, intern)
      .subscribe((updateIntern) => {
        const interns = this._interns.getValue();
        this._interns.next(
          interns.map((intern) => {
            if (intern.id === updateIntern.id) return updateIntern;
            return intern;
          })
        );
      });
    return this._interns;
  }

  public deleteIntern(id: string) {
    this._client
      .delete<Intern>(this._base + `/${id}`)
      .subscribe((deletedIntern) => {
        const interns = [...this._interns.getValue()];
        this._interns.next(
          interns.filter((intern) => intern.id !== deletedIntern.id)
        );
      });
    return this._interns;
  }
}
