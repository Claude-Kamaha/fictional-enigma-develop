export interface IGenericReponse {
    responseCode: string;
    message: string;
}
export interface IGetCustomerListPerStatusResponse extends IGenericReponse {
    data: {
        customer_id: number,
        username: string,
        phone_number: string,
        referal_code: string,
        creation_date: number,
        first_name: string,
        last_name: string,
        gender: string,
        email_address: string,
        date_of_birth: string,
        LANGUAGE: string,
        status: string,
        type: string,
        loyalty_level: number,
        loyalty_level_description: any,
        short_country_code: string,
        country_code: string,
        country_name_en: string,
        country_name_fr: string,
        customer_label: string,
        manager: any,
        godfather: any,
        kyclevel: number,
        kyclevelname: string,
        fiat_balance: number
    }[];
}
export interface IUpdateCryptoBalance {
    cryptoIsoAlphaCode: string;
    amount: number;
}

export interface IChangeCryptoSettings {
    cryptoIsoAlphaCode: string;
    minBuyFiat?: number;
    minSellFiat?: number;
    minBuyCrypto?: number;
    minSellCrypto?: number;
    maxSellCrypto?: number;
    buy_sender_address?: string;
    sell_recipient_address?: string;
    blockchainUrl?: string;
}

export interface ISaveCryptoSellingPrice {
    cryptoIsoAlphaCode: string;
    transactionType: number;
    customerType: number;
    usdSellingPrice: number;
    dateBegin: number;
    amountMin?: number;
    amountMax?: number;
    amountMinCrypto?: number;
    amountMaxCrypto?: number;
    rate?: number;
    priceSpread?: number;
    gasFees?: number;
    ejaraRate?: number;
    forCrypto?: number;
}

export interface IUpdateCustomerLoyaltyLevel {
    loyaltyLevelId: number;
    customerId: number;
}

export interface IUpdateCryptoUsdSellingPrice {
    cryptoIsoAlphaCode: number;
    amount: number;
}

export interface IUpdateCountryFeatureStatus {
    countryCode: string;
    feature: string;
    isActive: Boolean;
}

export interface IUpdateCountryStatus {
    countryCode: string;
    status: string;
}

export interface IUpdateCountryStatus {
    countryCode: string;
    status: string;
}
export interface IManualDeposit {
    customerUsername: string;
    amount: number;
    fiatCurrencyCode: string;
}
export interface IManualBuy {
    customerUsername: string;
    fiatIsoAlphaCode: string;
    cryptoIsoAlphaCode: string;
    amount: number;
    crypto_amount: number;
    globalFees: number;
    blockchainFees: number;
    usdCryptoRate: number;
    providerCryptoPrice: number;
    delivered_at: number;
    transaction_hash: string;
}
export interface IManualTransactionResponse extends IGenericReponse {
    data: {
        transactionId: number,
        status: string
    }
}

export interface IRevertManualTransaction {
    transactionId: number;
}
export interface ICreateCustomerFiatWallet {
    username: string;
    balance: number;
}
export interface ICreateCustomerFiatWalletResponse extends IGenericReponse {
    data: {
        id: number,
        balance: number
    }
}
export interface IDeleteTransaction {
    transactionId: number;
    message: string;
}
export interface IGetCustomerDetails {
    username: string;
}
export interface IGetCustomerDetailsResponse extends IGenericReponse {
    data: {
        username: string,
        phone_number: string,
        referal_code: string,
        first_name: string,
        last_name: string,
        email_address: string,
        date_of_birth: string,
        preferred_language: string,
        fiat_currency_id: number,
        fiat_currency_code: string,
        in_app_notifications: boolean,
        app_screenshots: boolean,
        account_status: string,
        customer_type: string,
        kyc_level_number: number,
        kyc_level_name: string,
        loyalty_level: number,
        country_id: number,
        country_code: string,
        country_name_en: string,
        country_name_fr: string,
        friends_referred: number,
        referral_rewards_count: number,
        amount_transacted: number,
        balance_in_default_fiat: number,
        balance_in_customer_fiat: string,
        daily_limit_remaining_amount: number,
        weekly_limit_remaining_amount: number,
        monthly_limit_remaining_amount: number,
        godfather: number,
    };
}
export interface IChangeCustomerType {
    username: string;
    type: string;
    changeReason: string;
}
export interface IChangeMoonpaySettings {
    currencyCode: string;
    moonpayMin?: number;
    moonpayMax?: number;
    moonpayUIMinDisplay?: number;
    moonpayUIMaxDisplay?: number;
    moonpayUIAVGDisplay?: number;
}
export interface IManualBuyPaymentUpdate {
    transactionId: number;
    status: string;
    message?: string;
}
export interface IChangeUserStatus {
    userId: number;
    status: string;
}
export interface IGetCustomerWallets {
    customerId: number;
}
export interface IGetCustomerWalletsResponse extends IGenericReponse {
    data: {
        label: string,
        address: string,
        balance: number,
        dateCreated: number,
        lastDateUpdated: number
    }[];
}
export interface IMigrateFiatWallet {
    username: string,
    v1Username: string;
}
export interface ISaveMigrationData {
    username: string,
    cryptoIsoAlphaCode: string;
    data?: string;
}



