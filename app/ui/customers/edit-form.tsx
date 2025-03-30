"use client";

import { PuppyRequest } from "@/app/lib/definitions";
import Link from "next/link";
import {
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { updatePuppyRequest } from "@/app/lib/actions";
import { useActionState } from "react";
import { PuppyService } from "@/app/lib/definitions";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import { CustomerState } from "@/app/lib/definitions";


export default function EditForm({ customerRequest }: { customerRequest: PuppyRequest}) {
  
  const [dates, setDates] = useState({
    startDate: new Date(customerRequest.date),
    endDate: new Date(customerRequest.date),
  });

  const initialState: CustomerState = { message: null, errors: {}, formData: {} };
  const updatePupRequest = updatePuppyRequest.bind(null, customerRequest.id);
  const [state, formAction] = useActionState(updatePupRequest, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Name */}
          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Owner First Name
            </label>
            <div className="relative">
              <input
                id="ownerFirstName"
                name="ownerFirstName"
                type="text"
                step="0.01"
                placeholder=""
                defaultValue={state?.formData?.ownerFirstName || customerRequest.first_name}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 w-full"
                aria-describedby="customer-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.first_name &&
                state.errors?.first_name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Owner Last Name
            </label>
            <div className="relative">
              <input
                id="ownerLastName"
                name="ownerLastName"
                type="text"
                step="0.01"
                placeholder=""
                defaultValue={state?.formData?.ownerLastName || customerRequest.last_name}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 w-full"
                aria-describedby="customer-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.last_name &&
                state.errors.last_name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Dog Name
            </label>
            <div className="relative">
              <input
                id="dogName"
                name="dogName"
                type="text"
                step="0.01"
                placeholder="dog name"
                defaultValue={state?.formData?.dogName || customerRequest.dog_name}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 w-full"
                aria-describedby="customer-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.dog_name &&
                state.errors.dog_name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Price
            </label>
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="price"
                defaultValue={state?.formData?.price || customerRequest.price}
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 w-full"
                aria-describedby="customer-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.price &&
                state.errors.price.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <fieldset aria-describedby="customer-error">
              <legend className="mb-2 block text-sm font-medium">
                Select Services
              </legend>
              <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex flex-col gap-4">
                  {Object.values(PuppyService).map((service, index) => (
                    <div className="flex items-center" key={service}>
                      <input
                        id={service}
                        name="services"
                        type="checkbox"
                        value={service}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        defaultChecked={state.formData?.services?.includes(service) || customerRequest.service.includes(service)}
                      />
                      <label
                        htmlFor={service}
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        {service}
                        {/* Add icons for other services if needed */}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.service &&
                state.errors.service.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Date
            </label>
            <div className="relative">
              <Datepicker
                disabled={true}
                inputId="date"
                inputName="date"
                minDate={new Date()}
                useRange={false}
                asSingle={true}
                primaryColor={"blue"}
                value={dates}
                // @ts-expect-error:
                onChange={(newValue) => setDates(newValue)}
              />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date &&
            state.errors.date.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Request</Button>
      </div>
    </form>
  );
}
