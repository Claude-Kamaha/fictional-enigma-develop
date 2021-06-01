import { Component, OnInit,ElementRef,ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerListService } from '../../core/customer-list/customer-list.service';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { CustomerList } from 'app/core/customer-list/customer-list.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge,  Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,takeUntil  } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
 dataSource: FilesDataSource | null;
  displayedColumns=[
  'username',
  'first_name',
  'last_name',
  'email_address',
  'date_of_birth',
  'preferred_language',
  'fiat_currency_id',
  'fiat_currency_code',
  'in_app_notifications',
  'app_screenshots?',
  'kyc_level_number',
  'kyc_level_name',
  'loyalty_level',
  'country_id',
  'country_code',
  'country_name_en',
  'country_name_fr',
  'friends_referred',
  'referral_rewards_count',
  'amount_transacted',
  'balance_in_default_fiat',
  'balance_in_customer_fiat'
  ]
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @ViewChild('filter', {static: true})
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(public customerListService: CustomerListService ) {
    //super();

    this._unsubscribeAll = new Subject();
}
ngOnInit(): void
{
    this.dataSource = new FilesDataSource(this.customerListService, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(150),
            distinctUntilChanged()
        )
        .subscribe(() => {
            if ( !this.dataSource )
            {
                return;
            }

            this.dataSource.filter = this.filter.nativeElement.value;
        });
}
}
export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {CustomerListService} customerListService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private customerListService: CustomerListService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this.customerListService.customerlist;
    }
/**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
 connect(): Observable<any[]>
 {
     const displayDataChanges = [
         this.customerListService.onCustomerChanged,
         this._matPaginator.page,
         this._filterChange,
         this._matSort.sortChange
     ];

     return merge(...displayDataChanges)
         .pipe(
             map(() => {
                     let data = this.customerListService.customerlist.slice();

                     data = this.filterData(data);

                     this.filteredData = [...data];

                     data = this.sortData(data);

                     // Grab the page's slice of data.
                     const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                     return data.splice(startIndex, this._matPaginator.pageSize);
                 }
             ));
 }  // -----------------------------------------------------------------------------------------------------
 // @ Accessors
 // -----------------------------------------------------------------------------------------------------

 // Filtered data
 get filteredData(): any
 {
     return this._filteredDataChange.value;
 }

 set filteredData(value: any)
 {
     this._filteredDataChange.next(value);
 }

 // Filter
 get filter(): string
 {
     return this._filterChange.value;
 }

 set filter(filter: string)
 {
     this._filterChange.next(filter);
 }
 // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
     filterData(data): any
     {
         if ( !this.filter )
         {
             return data;
         }
         return FuseUtils.filterArrayByString(data, this.filter);
     }
      /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'user_name':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'first_name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'last_name':
                
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'email_address':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'date_of_birth':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'preferred_language':
                    [propertyA, propertyB] = [a.active, b.active];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
 
 /* listCustomer: MatTableDataSource<any[]>;
  displayedColumns: string[] = ['Username'];


  
customerDetails: any[];
item: any[];
data:CustomerList[] = [];
/*
  ngOnInit(): void {
  // this.customerListService.getCustomerDetails();
this.customerListService.getCustomerDetails().subscribe(
   data => {
   let list= data.map(item =>{
     return {
       ...item
     //this.listCustomer = new MatTableDataSource(list);
    } });
 
// this.customerListService.getCustomerDetails();
});





  }
  
  //this.listCustomer = new MatTableDataSource(this.customerListService.getCustomerDetails().subscribe(data => this.data=data));
  */
}

