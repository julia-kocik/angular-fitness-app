import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, take } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.actions';
import * as fromRoot from '../app.reducer';


@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanges= new Subject<any>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];
  userid: string = '';

  constructor(
      private firestore: AngularFirestore,
      private uiService: UIService,
      private store: Store<fromTraining.State>,
      private authStore: Store<fromRoot.State>
    ) {}

  setUserId(): void {
    this.authStore.select(fromRoot.getUserId).pipe(take(1)).subscribe(ex => this.userid = ex)
  }

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
        // this.availableExercises = exercises
        // this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading());
        // this.exercisesChanges.next([...this.availableExercises]);
        this.store.dispatch(new Training.SetAvailable(exercises));
        },
        error: () => {
          // this.uiService.loadingStateChanged.next(false)
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar('Fetching failed please try again...', undefined, 3000)
        }
      }
      ))
  }

  startExercise(selectedId: string) {
   this.store.dispatch(new Training.StartTraining(selectedId))
  }

  completeExercise() {
    this.store.select(fromTraining.getActive).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...(ex as Exercise),
        date: new Date(),
        state: 'completed',
        userid: this.userid
      });
    })

    this.store.dispatch(new Training.StopTraining())
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActive).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...(ex as Exercise),
        duration: ex!.duration * (progress / 100),
        calories: ex!.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
        userid: this.userid
      });
    })
   this.store.dispatch(new Training.StopTraining())
  }


  fetchCompletedOrCancelledExercises() {
    this.setUserId()
    this.fbSubs.push(this.firestore
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any) => {
        const mapped = exercises.map((item: { date: { toDate: () => any; }; }) => ({...item, date: item.date.toDate()}))
        const filtered = mapped.filter((exe: { userid: string; })=> exe.userid === this.userid)
        this.store.dispatch(new Training.SetFinished(filtered));
    }));
  }

  cancelSubs() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private addDataToDatabase(exercise: Exercise) {
    this.firestore.collection('finishedExercises').add(exercise);
  }
}
