import { Subject } from "rxjs";

export const apiDataChangeObservable = new Subject();

export const websocketDataChangeObservable = new Subject();

export const dbDataChangeObservable = new Subject();

export const afterOpenSceneObservable = new Subject();

export const beforeOpenSceneObservable = new Subject();
