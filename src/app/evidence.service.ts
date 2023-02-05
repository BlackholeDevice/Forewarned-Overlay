import {Injectable} from '@angular/core';
import {Evidence} from "./evidence"
import {entries, filter, flow, map, reduce, sortBy, values} from 'lodash/fp';
import {Observable, of} from "rxjs";


function calcEvidence(...evidence: Evidence[]): number {
  return reduce((cumulative, flag) => cumulative | flag, 0, evidence);
}


@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  private readonly mejaiList: { [key: string]: number } = {
    'Necreph the Shadow': calcEvidence(Evidence.destruction, Evidence.disturbedTombs, Evidence.electronicDisturbance, Evidence.extinguishedFlames, Evidence.magneticDistortion, Evidence.metallicSignature, Evidence.vocalResponse, Evidence.radioactivity),
    'Rathos the Damned': calcEvidence(Evidence.footsteps, Evidence.disturbedTombs, Evidence.electronicDisturbance, Evidence.extinguishedFlames, Evidence.magneticDistortion, Evidence.metallicSignature, Evidence.radarDetection, Evidence.reanimation),
    'Dekan the Lost': calcEvidence(Evidence.footsteps, Evidence.tremors, Evidence.destruction, Evidence.disturbedTombs, Evidence.vocalResponse, Evidence.radarDetection, Evidence.radioactivity, Evidence.reanimation),
    'Ouphris the Forgotten': calcEvidence(Evidence.footsteps, Evidence.tremors, Evidence.extinguishedFlames, Evidence.magneticDistortion, Evidence.metallicSignature, Evidence.vocalResponse, Evidence.radioactivity, Evidence.reanimation),
    'Talgor the Perilous': calcEvidence(Evidence.tremors, Evidence.destruction, Evidence.electronicDisturbance, Evidence.extinguishedFlames, Evidence.magneticDistortion, Evidence.radarDetection, Evidence.radioactivity, Evidence.reanimation),
    'Ataimon the Abominable': calcEvidence(Evidence.footsteps, Evidence.tremors, Evidence.destruction, Evidence.disturbedTombs, Evidence.electronicDisturbance, Evidence.metallicSignature, Evidence.vocalResponse, Evidence.radarDetection)
  };

  private calcMejai(evidence: Evidence[]): string[] {
    const flag = calcEvidence(...evidence);
    return flow(
      entries,
      filter(([_, v]) => (v & flag) === flag || flag === 0),
      map(([k]) => k),
      sortBy(String)
    )(this.mejaiList)
  }

  public findPossibleMejai(evidence: Evidence[]): Observable<string[]> {
    return of(this.calcMejai(evidence));
  }

  public summarizeEvidence(evidence: Evidence[]): Observable<{[key: number]: number}> {
    return flow(
      values,
      filter(v => typeof v === 'number'),
      reduce((obj, v) => ({...obj, [v]: this.calcMejai([...evidence, v]).length}), {}),
      of
    )(Evidence);
  }
}
