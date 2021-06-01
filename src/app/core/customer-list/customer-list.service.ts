import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomerList } from './customer-list.model';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { tap, catchError, } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

export class CustomerListService implements Resolve<any>
{
  constructor(
    private httpClient: HttpClient
  
    ) { 
      this.onCustomerChanged = new BehaviorSubject({});
    }

  //private httpclient: HttpClient;
  apiHost = `https://sandbox.nellys-coin.ejaraapis.xyz/api/v1/customer/profile-details`;
  customerlist: any[];
  onCustomerChanged: BehaviorSubject<any>;
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
  }
    

  
  
  /*
 getCustomerDetails(): Observable< CustomerList[]>{
  console.log('fetched heroes');
    return this.httpClient.get< CustomerList[]>(this.apiHost, this.httpOptions)
    .pipe( 
      tap(data => console.log('fetched heroes')),
      catchError(this.handleError<CustomerList[]>('getCustomerDetails', []))
      );
      console.log('fetched heroes2');
 //.toPromise()
   // .then(res => this.list = res as CustomerList[]);
   

    
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
     console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } 
    
  /* //step 2
  getCustomerDetails(){
    let req = this.httpClient.get< CustomerList[]>(this.apiHost, this.httpOptions);
    // let res = req.toPromise()
    console.log(this.apiHost);
    
    // .then(res => this.list = res as CustomerList[]);
   
    
  }

}
*/
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
{
    return new Promise<void>((resolve, reject) => {

        Promise.all([
            this.getCustomerDetails()
        ]).then(
            () => {
                resolve();
            },
            reject
        );
    });
}

/**
 * Get products
 *
 * @returns {Promise<any>}
 */
 getCustomerDetails(): Promise<any>
{
    return new Promise<void>((resolve, reject) => {
        this.httpClient.get(this.apiHost)
            .subscribe((response: any) => {
                this.customerlist = response;
                this.onCustomerChanged.next(this.customerlist);
                resolve(response);
            }, reject);
    });
}
}
