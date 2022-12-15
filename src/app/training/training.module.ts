import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingComponent } from "./training.component";

@NgModule({
    declarations: [NewTrainingComponent, PastTrainingComponent, TrainingComponent, CurrentTrainingComponent, StopTrainingComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AngularFirestoreModule,
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
