import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanges= new Subject<any>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: any = null;
  private fbSubs: Subscription[] = [];

  constructor(private firestore: AngularFirestore, private uiService: UIService, private store: Store<{ui: fromRoot.State}>) {}

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading());

    this.fbSubs.push(this.firestore
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            const data = doc.payload.doc.data();
            return {
              ...(data as Exercise),
              id: doc.payload.doc.id,
            };
          });
        })
      ).subscribe({
        next: (exercises: Exercise[]) => {
        this.availableExercises = exercises
        // this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading());
        this.exercisesChanges.next([...this.availableExercises]);
        },
        error: () => {
          // this.uiService.loadingStateChanged.next(false)
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar('Fetching failed please try again...', undefined, 3000)
          this.exercisesChanges.next(null);
        }
      }
      ))
  }

  startExercise(selectedId: string) {
    const selected = this.availableExercises?.find(
      (ex) => ex.id === selectedId
    );
    this.runningExercise = selected ? selected : null;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.firestore
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any) => {
        this.finishedExercisesChanged.next(exercises);
    }));
  }

  cancelSubs() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private addDataToDatabase(exercise: Exercise) {
    this.firestore.collection('finishedExercises').add(exercise);
  }
}
