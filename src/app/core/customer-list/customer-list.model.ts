export class CustomerList {
            username: string = '';
            first_name: string= '';
            last_name: string= '';
            email_address: string= '';
            date_of_birth?: number= 0;
            preferred_language: string= '';
            fiat_currency_id: number= 0;
            fiat_currency_code: string= '';
            in_app_notifications?: boolean;
            app_screenshots?: boolean;
            kyc_level_number: number= 0;
            kyc_level_name : string= '';
            loyalty_level: string= '';
            country_id: number= 0;
            country_code: string= '';
            country_name_en: string= '';
            country_name_fr: string= '';
            friends_referred: number= 0;
            referral_rewards_count: number= 0;
            amount_transacted: number= 0;
            balance_in_default_fiat : number= 0;
            balance_in_customer_fiat : number= 0;
}
