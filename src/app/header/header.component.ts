import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AsyncSubject } from 'rxjs';
import { Funko } from '../app.component';
import { MatToolbar } from '@angular/material';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @ViewChild('extendForm')
    extendForm: MatToolbar;

    categories: string[];
    collections: string[];

    @Input()
    funkoList: AsyncSubject<Funko[]>;

    @Output()
    change: EventEmitter<Funko[]> = new EventEmitter<Funko[]>();

    searchForm = new FormGroup({
        searchModel: new FormControl(''),
        radioModel: new FormControl('all'),
        categorieModel: new FormControl('All'),
        collectionModel: new FormControl('All')
    });
    constructor(private _renderer: Renderer2) {}

    ngOnInit() {
        this.funkoList.subscribe(fList => {
            this.categories = Object.keys(
                fList.reduce((cats, f) => {
                    cats[f.category] = true;
                    return cats;
                }, {})
            ).sort();

            this.collections = Object.keys(
                fList.reduce((coll, f) => {
                    coll[f.collection] = true;
                    return coll;
                }, {})
            ).sort();

            this.categories.unshift('All');
            this.collections.unshift('All');
        });

        this.searchForm.valueChanges.subscribe(() => {
            this._filtering();
        });
    }

    resetForm() {
        this.searchForm.patchValue({ radioModel: 'all', categorieModel: 'All', collectionModel: 'All' });
    }

    toggleExtendForm() {
        if (this.extendForm._elementRef.nativeElement.classList.contains('open')) {
            this._renderer.removeClass(this.extendForm._elementRef.nativeElement, 'open');
        } else {
            this._renderer.addClass(this.extendForm._elementRef.nativeElement, 'open');
        }
    }

    private _filtering() {
        this.funkoList.subscribe(fList => {
            this.change.emit(
                fList
                    .filter(f => {
                        return this.searchForm.get('radioModel').value === 'all' ? true : f[this.searchForm.get('radioModel').value];
                    })
                    .filter(f => {
                        return this.searchForm.get('categorieModel').value === 'All' ? true : f.category === this.searchForm.get('categorieModel').value;
                    })
                    .filter(f => {
                        return this.searchForm.get('collectionModel').value === 'All' ? true : f.collection === this.searchForm.get('collectionModel').value;
                    })
                    .filter(funko => {
                        const val = this.searchForm.get('searchModel').value;
                        return (
                            funko.name.toLowerCase().includes(val.toLowerCase()) ||
                            funko.category.toLowerCase().includes(val.toLowerCase()) ||
                            funko.collection.toLowerCase().includes(val.toLowerCase()) ||
                            funko.number.toLowerCase().includes(val.toLowerCase())
                        );
                    })
            );
        });
    }
}
