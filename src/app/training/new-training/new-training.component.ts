import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/responsive.service';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isPhonePortrait: boolean = false;
  isTabletPortrait: boolean = false;
  isLoading: boolean = false;
  availableExercises!: Exercise[];
  subscription!: Subscription;
  trainingSubscription!: Subscription;
  isLoading$!: Observable<boolean>;

  constructor(
    private responsive: BreakpointObserver,
    private responsiveService: ResponsiveService,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ui: fromRoot.State}>
  ) {}

  ngOnInit() {
    this.subscription = this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetPortrait])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        const resultValues = this.responsiveService.checkDementions(breakpoints[Breakpoints.HandsetPortrait], breakpoints[Breakpoints.TabletPortrait])
        this.isPhonePortrait = resultValues.isPhonePortrait
        this.isTabletPortrait = resultValues.isTabletPortrait
    });

    this.trainingSubscription = this.trainingService.exercisesChanges.subscribe(
      exercises => this.availableExercises = exercises
    );
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => this.isLoading = isLoading
    // )
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)

    this.fetchAvailableExercises()
  }

  fetchAvailableExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onButtonClick(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.trainingSubscription) {
      this.trainingSubscription.unsubscribe();
    }
  }
}
