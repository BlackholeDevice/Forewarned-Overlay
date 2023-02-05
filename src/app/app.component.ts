import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Evidence, EvidenceLang} from './evidence';
import {EvidenceService} from "./evidence.service";
import {filter, findIndex, flow, get, reduce, values} from "lodash/fp";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ForewarnedOverlay';

  public readonly evidenceButtons: { [key: number]: string } = flow(
    values,
    filter(v => typeof v === 'number'),
    reduce((obj: any, v: number) => ({...obj, [v]: EvidenceLang[v]}), {})
  )(Evidence);

  public readonly get = get;

  public mejaiList$?: Observable<string[]>;
  public summary$?: Observable<{ [key: number]: number }>;
  public evidence: Evidence[] = [];

  constructor(private service: EvidenceService) {
  }


  public ngOnInit(): void {
    console.log(this.evidenceButtons);
    this.refresh();
  }

  public toggleEvidence(key: string) {
    let flag = parseInt(key, 10);
    const index = this.indexOf(key);
    if (index !== -1) {
      this.evidence.splice(index, 1);
    } else {
      this.evidence.push(flag);
    }
    this.refresh();
  }

  public refresh(): void {
    this.mejaiList$ = this.service.findPossibleMejai(this.evidence);
    this.summary$ = this.service.summarizeEvidence(this.evidence);
  }

  private indexOf(key: string): number {
    let flag = parseInt(key, 10);
    return findIndex(e => e === flag, this.evidence);
  }

  public has(key: string): boolean {
    return this.indexOf(key) !== -1;
  }
}
