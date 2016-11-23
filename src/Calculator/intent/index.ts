import xs, {Stream, MemoryStream} from 'xstream';
import delay from 'xstream/extra/delay';
import {DOMSource} from '@cycle/dom/xstream-typings';
import Matrix from '../../Matrix/index';
import {MatrixID} from '../model';
import {controlPanelIntent} from './controlPanel';
import {resizeIntent} from './resize';

export type Action =
  ResizeAction |
  StartMultiplyAction |
  AllowContinueAction |
  NextStepAction |
  ResetAction |
  EndAction;

export type Direction = 'row' | 'column';

export interface ResizeAction {
  type: 'RESIZE';
  payload: {
    target: MatrixID;
    resizeParam: {
      direction: Direction;
      amount: number;
    };
  }
}

export interface StartMultiplyAction {
  type: 'START_MULTIPLY';
  payload: null;
}

export interface AllowContinueAction {
  type: 'ALLOW_CONTINUE';
  payload: null;
}

export interface NextStepAction {
  type: 'NEXT_STEP';
  payload: null;
}

export interface ResetAction {
  type: 'RESET';
  payload: null;
}

export interface EndAction {
  type: 'END';
  payload: null;
}

export function isResizeAction(ac: Action): ac is ResizeAction {
  return ac.type === 'RESIZE';
}

export function isStartMultiplyAction(ac: Action): ac is StartMultiplyAction {
  return ac.type === 'START_MULTIPLY';
}

export function isAllowContinueAction(ac: Action): ac is AllowContinueAction {
  return ac.type === 'ALLOW_CONTINUE';
}

export function isNextStepAction(ac: Action): ac is NextStepAction {
  return ac.type === 'NEXT_STEP';
}

export function isResetAction(ac: Action): ac is ResetAction {
  return ac.type === 'RESET';
}

export function isEndAction(ac: Action): ac is EndAction {
  return ac.type === 'END';
}

export default function intent(domSource: DOMSource): Stream<Action> {
  const resizeAction$ = resizeIntent(domSource);
  const controlPanelAction$ = controlPanelIntent(domSource);

  return xs.merge(
    resizeAction$,
    controlPanelAction$,
  );
}