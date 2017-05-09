export interface Discount{
    $key?: string;
    date?: string;
    company_id?: string;
    company_name?: string;
    name?: string;
    amount?: string;
    discount_type?: string;
    category?: string;
    description: string;
    image: string;
    path: string;
    long_description: string;
    start_date: string;
    end_date: string;
    redemption_code?: string;
    is_active?: string;
}