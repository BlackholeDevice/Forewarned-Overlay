import {Component, OnDestroy, OnInit, Optional} from '@angular/core';
import {finalize, Observable, tap} from "rxjs";
import {Evidence, Evidences, EvidenceType} from './evidence';
import {EvidenceService} from "./evidence.service";
import {difference, entries, filter as _filter, flow, get, indexOf, map, reduce, sortBy} from "lodash/fp";
import {Mejai} from "./mejai";
import {WakelockService} from "./wakelock.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
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
  public automatic: EvidenceType[] = [];

  constructor(private service: EvidenceService, @Optional() private wakeLock: WakelockService) {
  }


  public ngOnInit(): void {
    console.log(this.evidenceButtons);
    this.refresh();
    this.wakeLock?.acquire().subscribe();
  }

  public ngOnDestroy() {
    this.wakeLock?.release().subscribe();
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
    this.automatic = [];
    this.refresh();
  }

  public refresh(): void {
    this.mejaiList$ = this.service.findPossibleMejai(this.evidence);
    this.summary$ = this.service.summarizeEvidence(this.evidence).pipe(
      tap(summary => {
        const [first] = this.evidence;
        if (first && this.adding) {
          const count = summary[first];
          const evidence = flow(
            entries,
            _filter(([_, matching]: [EvidenceType, number]) => matching === count),
            map(([mejai]) => mejai)
          )(summary);
          this.automatic = difference(evidence, this.evidence);
        }
      }),
      finalize(() => this.adding = false)
    );
  }

  public has(key: string, evidence?: EvidenceType[]): boolean {
    let evidenceType = key as EvidenceType;
    return this.indexOf(evidenceType, evidence) !== -1;
  }

  private indexOf(key: EvidenceType, evidence?: EvidenceType[]): number {
    return indexOf(key, evidence || this.evidence);
  }
}
