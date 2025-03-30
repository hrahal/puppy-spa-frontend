export enum PuppyService {
  Grooming = "grooming",
  Training = "training",
  Walking = "walking",
  Daycare = "daycare",
}

export type PuppyRequest = CreatePuppyRequest & {
    id: number,
}

export type CreatePuppyRequest = {
  date: Date,
  first_name: string,
  last_name: string
  dog_name: string
  service: PuppyService[],
  price: number,
  arrival_time: Date,
  is_served: boolean
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type PuppyRequestFormData = {
  date?: any;
  price?: any;
  services?: any;
  ownerFirstName?: any;
  ownerLastName?: any;
  dogName?: any;
};

export type CustomerState = {
  errors?: {
    date?: string[];
    price?: string[];
    arrival_time?: string[];
    service?: string[];
    first_name?: string[];
    last_name?: string[];
    is_served?: string[];
    dog_name?: string[];
  };
  message?: string | null;
  formData?: PuppyRequestFormData;
};