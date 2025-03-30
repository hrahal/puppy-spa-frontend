'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreatePuppyRequest, CustomerState, PuppyService, State } from './definitions';
import { deleteRequestById, createCustomersOrder, editCustomerOrder } from './customer-data';
import { formatDate } from './utils';

const today = new Date();
today.setHours(0, 0, 0, 0);

const PuppyRequestSchema = z.object({
  id: z.number().optional(),
  date: z.date({ invalid_type_error: 'Please select a date' }).min(today, {
    message: 'Date cannot be in the past',
  }),
  first_name: z.string({ invalid_type_error: 'Please select a first name' }).min(1),
  last_name: z.string({ invalid_type_error: 'Please select a last name' }).min(1),
  dog_name: z.string().min(1),
  service: z.array(z.nativeEnum(PuppyService)).nonempty({ message: 'Please choose at least one service' }),
  price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  arrival_time: z.date(),
  is_served: z.boolean(),
});


async function processPuppyRequest(
  formData: FormData,
  operation: (request: CreatePuppyRequest, id?: number) => Promise<any>,
  successMessage: string,
  errorMessage: string,
  id?: number
): Promise<CustomerState> {

  const formDate: string = (formData.get('date') ? formData.get('date')?.toString() : "") as string;
  
  const validatedFields = PuppyRequestSchema.safeParse({
    date: new Date(formDate),
    arrival_time: new Date(),
    price: formData.get('price'),
    service: formData.getAll('services'),
    first_name: formData.get('ownerFirstName'),
    last_name: formData.get('ownerLastName'),
    dog_name: formData.get('dogName'),
    is_served: false,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: errorMessage,
      formData: {
        date: formData.get('date')?.toString(),
        price: formData.get('price')?.toString(),
        services: formData.getAll('services'),
        ownerFirstName: formData.get('ownerFirstName')?.toString(),
        ownerLastName: formData.get('ownerLastName')?.toString(),
        dogName: formData.get('dogName')?.toString(),
      },
    };
  }

  const { dog_name, service, price, arrival_time, first_name, date, is_served, last_name } = validatedFields.data;
  const request: CreatePuppyRequest = {
    dog_name,
    service,
    price,
    arrival_time,
    first_name,
    last_name,
    date,
    is_served,
  };

  try {
    await operation(request, id);
  } catch (error) {
    return { message: `Error: Failed to ${successMessage}.` };
  }

  const shortDate = formatDate(date);
  revalidatePath(`/dashboard/customers?date=${shortDate}`);
  redirect(`/dashboard/customers?date=${shortDate}`);
}

export async function createPuppyRequest(prevState: State, formData: FormData) {
  return processPuppyRequest(
    formData,
    createCustomersOrder,
    'Create Order',
    'Missing Fields. Failed to Create Order.'
  );
}

export async function deletePuppyRequest(id: number, date: Date) {
  try {
    await deleteRequestById(id);
  } catch (error) {
    console.error(error);
  }

  const shortDate = formatDate(date);
  revalidatePath(`/dashboard/customers?date=${shortDate}`);
  redirect(`/dashboard/customers?date=${shortDate}`);
}

export async function updatePuppyRequest(id: number, prevState: CustomerState, formData: FormData) {
  return processPuppyRequest(
    formData,
    async (request) => editCustomerOrder({ ...request, id: id }),
    'Update Order',
    'Missing Fields. Failed to Update Order.',
    id
  );
}