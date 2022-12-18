import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/responsive.service';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../../training/training.reducer';
import * as fromRoot from '../../app.reducer';
import { TrainingService } from '../training.service';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isPhonePortrait: boolean = false;
  isTabletPortrait: boolean = false;
  availableExercises$!: Observable<Exercise[]>;

  subscription!: Subscription;
  isLoading$!: Observable<boolean>;

  constructor(
    private responsive: BreakpointObserver,
    private responsiveService: ResponsiveService,
    private store: Store<fromTraining.State>,
    private trainingService: TrainingService
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

    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.availableExercises$ = this.store.select(fromTraining.getAvailable)
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
  }
}
