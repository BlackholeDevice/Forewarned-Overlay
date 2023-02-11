import {Component, OnInit} from '@angular/core';
import {finalize, Observable, tap} from "rxjs";
import {Evidence, Evidences, EvidenceType} from './evidence';
import {EvidenceService} from "./evidence.service";
import {entries, filter as _filter, flow, get, indexOf, map, reduce, sortBy} from "lodash/fp";
import {Mejai} from "./mejai";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ForewarnedOverlay';
  private adding: boolean = false;

  public readonly evidenceButtons: Record<EvidenceType, Evidence> = flow(
    entries,
    sortBy(0),
    reduce((obj, [k, v]: [EvidenceType, Evidence]) => ({...obj, [k]: v as Evidence}), {})
  )(Evidences);

  public readonly get = get;

  public mejaiList$?: Observable<Mejai[]>;
  public summary$?: Observable<{ [key: number]: number }>;
  public evidence: EvidenceType[] = [];

  constructor(private service: EvidenceService) {
  }


  public ngOnInit(): void {
    console.log(this.evidenceButtons);
    this.refresh();
  }

  public toggleEvidence(key: string) {
    let evidenceType = key as EvidenceType;
    const index = this.indexOf(evidenceType);
    if (index !== -1) {
      this.evidence.splice(index, 1);
    } else {
      this.adding = true;
      this.evidence.push(evidenceType);
    }
    this.refresh();
  }

  public reset(): void {
    this.evidence = [];
    this.refresh();
  }

  public refresh(): void {
    this.mejaiList$ = this.service.findPossibleMejai(this.evidence);
    this.summary$ = this.service.summarizeEvidence(this.evidence).pipe(
      tap(summary => {
        const [first] = this.evidence;
        if (first && this.adding) {
          const count = summary[first];
          this.evidence = flow(
            entries,
            _filter(([_, matching]: [EvidenceType, number]) => matching === count),
            map(([mejai]) => mejai)
          )(summary)
        }
      }),
      finalize(() => this.adding = false)
    );
  }

  private indexOf(key: EvidenceType): number {
    return indexOf(key, this.evidence);
  }

  public has(key: string): boolean {
    let evidenceType = key as EvidenceType;
    return this.indexOf(evidenceType) !== -1;
  }
}
