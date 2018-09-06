import { Component, OnInit, Input } from '@angular/core';
import { Funko } from '../app.component';
import { MatDialog } from '@angular/material';
import { FunkoDetailComponent } from '../funko-detail/funko-detail.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'funko-list',
    templateUrl: './funko-list.component.html',
    styleUrls: ['./funko-list.component.scss']
})
export class FunkoListComponent implements OnInit {
    @Input()
    funkoFilter: Funko[];

    constructor(private _dialog: MatDialog) {}

    ngOnInit() {}

    openDetail(funko: Funko) {
        const dialogRef = this._dialog.open(FunkoDetailComponent, {
            width: '500px',
            data: funko
        });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }
}
