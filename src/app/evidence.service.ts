import {Injectable} from '@angular/core';
import {Evidences, EvidenceType} from "./evidence"
import {entries, filter, flow, keys, map as _map, reduce, sortBy} from 'lodash/fp';
import {Observable, of, map} from "rxjs";
import {Mejai, Mejais, MejaiType} from "./mejai";


export function calcEvidence(...evidenceTypes: EvidenceType[]): number {
  return flow(
    _map((evidenceType: EvidenceType) => Evidences[evidenceType]),
    reduce((cumulative, {mask}) => cumulative | mask, 0)
  )(evidenceTypes);
}


@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  private readonly mejaiList: Record<MejaiType, number> = flow(
    entries,
    reduce((obj, [mejaiType, {evidence}]: [MejaiType, Mejai]) => ({
      ...obj,
      [mejaiType]: calcEvidence(...evidence)
    }), {})
  )(Mejais);

  private calcMejai(evidence: EvidenceType[]): MejaiType[] {
    const flag = calcEvidence(...evidence);
    return flow(
      entries,
      filter(([_, v]) => (v & flag) === flag || flag === 0),
      _map(([k]) => k),
      sortBy(String)
    )(this.mejaiList)
  }

  public findPossibleMejai(evidence: EvidenceType[]): Observable<Mejai[]> {
    return of(this.calcMejai(evidence)).pipe(map(_map(type => Mejais[type])));
  }

  public summarizeEvidence(evidence: EvidenceType[]): Observable<Record<EvidenceType, number>> {
    return flow(
      keys,
      reduce((obj, key: EvidenceType) => ({
        ...obj,
        [key]: this.calcMejai([...evidence, key]).length}), {}),
      of
    )(Evidences);
  }
}
