import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ]

  private runningExercise: any = null
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    const selected = this.availableExercises?.find(ex => ex.id === selectedId);
    this.runningExercise = selected ? selected : null
    this.exerciseChanged.next({...this.runningExercise})
  }

  completeExercise() {
    this.exercises.push({...this.runningExercise, date: Date(), state: 'completed'})
    this.runningExercise = null;
    this.exerciseChanged.next(null)
  }

  cancelExercise(progress: number) {
    this.exercises.push(
      {...this.runningExercise,
        duration: this.runningExercise.duration * (progress/100),
        calories: this.runningExercise.duration * (progress/100),
        date: Date(),
        state: 'cancelled'
      })
    this.runningExercise = null;
    this.exerciseChanged.next(null)
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }
}
