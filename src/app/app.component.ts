import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Evidence, EvidenceLang} from './evidence';
import {EvidenceService} from "./evidence.service";
import {filter, findIndex, flow, reduce, values} from "lodash/fp";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ForewarnedOverlay';

  public readonly evidenceButtons: { [key: number]: string } = flow(
    values,
    filter(v => typeof v === 'number'),
    reduce((obj: any, v: number) => ({...obj, [v]: EvidenceLang[v]}), {})
  )(Evidence);
  // @ts-ignore
  public mejaiList$: Observable<string[]>;
  private evidence: Evidence[] = [];

  constructor(private service: EvidenceService) {
  }


  public ngOnInit(): void {
    console.log(this.evidenceButtons);
    this.refresh()
  }

  public toggleEvidence(key: string) {
    // @ts-ignore
    let flag = parseInt(key, 10);
    const index = findIndex(e => e === flag, this.evidence);
    if (index !== -1) {
      this.evidence.splice(index, 1);
    } else {
      this.evidence.push(flag);
    }
    this.refresh();
  }

  private refresh(): void {
    this.mejaiList$ = this.service.findPossibleMejai(this.evidence);
  }
}
