import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/responsive.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isPhonePortrait: boolean = false;
  isTabletPortrait: boolean = false;
  availableExercises: Exercise[] = [];
  subscription!: Subscription;
  @Output() trainingStart = new EventEmitter<void>();

  constructor(
    private responsive: BreakpointObserver,
    private responsiveService: ResponsiveService,
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
    this.availableExercises = this.trainingService.getAvailableExercises()
  }

  onButtonClick() {
    this.trainingStart.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
