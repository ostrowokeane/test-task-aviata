export interface FlightPreview {
  id: string;
  carrier: string;
  carrier_name: string;
  price: string;
  origin_code: string;
  dest_code: string;
  refundable: boolean;
  dep_time: string;
  arr_time: string;
  best_time: string;
  segments_between: string[];
  luggage: string | null;
}

export interface Flight {
  itineraries: [
    [
      {
        dep_date: string;
        hash: string;
        dir_index: number;
        price: {
          currency: string;
          amount: string;
          price_raw: number;
        };
        layovers: number[];
        arr_date: string;
        allowed_offers: [];
        carrier_name: string;
        is_meta: boolean;
        segments: {
          origin: string;
          airport_dest: string;
          arr_time_iso: string;
          dep_terminal: string;
          dep_time_iso: string;
          carrier_name: string;
          stop_locations: [];
          dest_code: string;
          airport_dest_terminal: string;
          equipment: string;
          flight_num: string;
          stops: number;
          airport_origin: string;
          cabin: string;
          dep_time: string;
          dest: string;
          origin_code: string;
          baggage_options: [
            {
              unit: string;
              value: number;
            }
          ];
          arr_time: string;
          plane: string;
          services: {
            full_description: string;
            alt_text: string;
            code: string;
            description: string;
            title: string;
            default: string;
            solution: string;
            value: string;
            icon: string;
          };
          fare_basis_code: string;
          airport_origin_terminal: string;
          arr_terminal: string;
          carrier: string;
          fare_seats: number;
        }[];
        stops: number;
        carrier: string;
        refundable: boolean;
        traveltime: number;
      }
    ]
  ];
  price_details: {
    base_raw: number;
    modifiers: string;
    modifiers_raw: number;
    taxes: string;
    base: string;
    taxes_raw: number;
  };
  price: string;
  currency: string;
  bonus_usage: boolean;
  services: {
    // "20KG": {
    [key: string]: {
      full_description: string;
      alt_text: string;
      code: string;
      description: string;
      title: string;
      default: string;
      solution: string;
      value: string;
      icon: string;
    };
  };
  price_raw: number;
  validating_carrier: string;
  id: string;
  has_meta: boolean;
  has_offers: boolean;
  best_time: number;
  bonus_accrual: boolean;
  bonus_accrual_details: null;
  bonus_usage_details: null;
  provider: string;
  refundable: boolean;
  provider_class: string;
}
