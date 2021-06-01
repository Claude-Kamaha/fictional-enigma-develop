import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    IChangeCryptoSettings,
    IChangeCustomerType,
    IChangeMoonpaySettings,
    IChangeUserStatus,
    ICreateCustomerFiatWallet,
    ICreateCustomerFiatWalletResponse,
    IDeleteTransaction,
    IGenericReponse,
    IGetCustomerDetailsResponse,
    IGetCustomerListPerStatusResponse,
    IGetCustomerWalletsResponse,
    IManualBuy,
    IManualBuyPaymentUpdate,
    IManualDeposit,
    IManualTransactionResponse,
    IMigrateFiatWallet,
    IRevertManualTransaction,
    ISaveCryptoSellingPrice,
    ISaveMigrationData,
    IUpdateCountryFeatureStatus,
    IUpdateCountryStatus,
    IUpdateCryptoBalance,
    IUpdateCryptoUsdSellingPrice,
    IUpdateCustomerLoyaltyLevel
} from './admin';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    apiHost = `https://sandbox.nellys-coin.ejaraapis.xyz/admin`;

    constructor(private httpClient: HttpClient) { }

    // ** crypto related methods
    saveCryptoSellingPrice = (payload: ISaveCryptoSellingPrice): Observable<IGenericReponse> => {
        return this.httpClient.post<IGenericReponse>(`${this.apiHost}/save-crypto-selling-price`, payload);
    }

    changeCryptoSettings = (payload: IChangeCryptoSettings): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/change-crypto-settings`, payload);
    }

    updateCryptoBalance = (payload: IUpdateCryptoBalance): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/update-crypto-balance`, payload);
    }

    updateCryptoUsdPrice = (payload: IUpdateCryptoUsdSellingPrice): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/update-crypto-usd-price`, payload);
    }


    // ** customer and others related methods
    createCustomerFiatWallet = (payload: ICreateCustomerFiatWallet): Observable<ICreateCustomerFiatWalletResponse> => {
        return this.httpClient.post<ICreateCustomerFiatWalletResponse>(`${this.apiHost}/create-fiat-wallet-for-customer`, payload);
    }

    getCustomerListPerStatus = (params: HttpParams): Observable<IGetCustomerListPerStatusResponse> => {
        return this.httpClient.get<IGetCustomerListPerStatusResponse>(`${this.apiHost}/get-customer-list-per-status`, { params });
    }

    getCustomerDetails = (params: HttpParams): Observable<IGetCustomerDetailsResponse> => {
        return this.httpClient.get<IGetCustomerDetailsResponse>(`${this.apiHost}/get-customer-details`, { params });
    }

    getCustomerWallets = (params: HttpParams): Observable<IGetCustomerWalletsResponse> => {
        return this.httpClient.get<IGetCustomerWalletsResponse>(`${this.apiHost}/get-customer-wallets`, { params });
    }

    updateCustomerLoyaltyLevel = (payload: IUpdateCustomerLoyaltyLevel): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/update-customer-loyalty-level`, payload);
    }

    changeCustomerType = (payload: IChangeCustomerType): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/change-customer-type`, payload);
    }

    changeUserStatus = (payload: IChangeUserStatus): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/change-user-status`, payload);
    }

    updateCountryFeatureStatus = (payload: IUpdateCountryFeatureStatus): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/update-country-feature-status`, payload);
    }

    updateCountryStatus = (payload: IUpdateCountryStatus): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/update-country-status`, payload);
    }


    // ** transactions related methods
    saveMigrationData = (payload: ISaveMigrationData): Observable<IGenericReponse> => {
        return this.httpClient.post<IGenericReponse>(`${this.apiHost}/save-migration-data`, payload);
    }

    manualDeposit = (payload: IManualDeposit): Observable<IManualTransactionResponse> => {
        return this.httpClient.post<IManualTransactionResponse>(`${this.apiHost}/manual-deposit`, payload);
    }

    manualBuy = (payload: IManualBuy): Observable<IManualTransactionResponse> => {
        return this.httpClient.post<IManualTransactionResponse>(`${this.apiHost}/manual-buy`, payload);
    }

    manualBuyPaymentUpdate = (payload: IManualBuyPaymentUpdate): Observable<IGenericReponse> => {
        return this.httpClient.post<IGenericReponse>(`${this.apiHost}/manual-buy-payment-update`, payload);
    }

    revertManualTransaction = (payload: IRevertManualTransaction): Observable<IGenericReponse> => {
        return this.httpClient.post<IGenericReponse>(`${this.apiHost}/revert-manual-transaction`, payload);
    }

    changeMoonpaySettings = (payload: IChangeMoonpaySettings): Observable<IGenericReponse> => {
        return this.httpClient.put<IGenericReponse>(`${this.apiHost}/change-moonpay-settings`, payload);
    }

    deleteTransaction = (params: HttpParams): Observable<IGenericReponse> => {
        return this.httpClient.delete<IGenericReponse>(`${this.apiHost}/delete-transaction`, { params });
    }

    migrateFiatWallet = (payload: IMigrateFiatWallet): Observable<IGenericReponse> => {
        return this.httpClient.post<IGenericReponse>(`${this.apiHost}/migrate-fiat-wallet`, payload);
    }
}
