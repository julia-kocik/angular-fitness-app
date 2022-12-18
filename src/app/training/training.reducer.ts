import { Exercise } from "./exercise.model";
import { SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions } from "./training.actions";
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TrainingState {
  availableExercises: Exercise[],
  finishedExercises: Exercise[],
  activeTraining: Exercise | null
}

export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null

}

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions): TrainingState {
  switch(action.type) {
    case SET_AVAILABLE_TRAININGS: {
      return {
        ...state,
        availableExercises: action.payload
      }
    }
    case SET_FINISHED_TRAININGS: {
      return {
        ...state,
        finishedExercises: action.payload
      }
    }
    case START_TRAINING: {
      const result = state.availableExercises.find(ex=> ex.id == action.payload)
      return {
        ...state,
        activeTraining: result ? result : null
      }
    }
    case STOP_TRAINING: {
      return {
        ...state,
        activeTraining: null
      }
    }
    default:
      return state;
  }
}




export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailable = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinished = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActive = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);

export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null)
