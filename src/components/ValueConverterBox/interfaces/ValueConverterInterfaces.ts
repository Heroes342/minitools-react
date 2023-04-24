export interface CurrencyData {
    meta: {
      last_updated_at: string;
    };
    data: {
      [currencyCode: string]: number;
    };
  }
