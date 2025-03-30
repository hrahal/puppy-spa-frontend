"use client"

import { useCallback, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend";
import { getCustomers, changeCustomersOrder, editCustomerOrder } from "@/app/lib/customer-data";
import { CreateRequest, DeleteRequest, UpdateRequest } from "@/app/ui/customers/buttons";
import { lusitana } from '@/app/ui/fonts';
import { formatDate } from "@/app/lib/utils";
import CustumerRow from "../../ui/customers/custumer-row";
import { PuppyRequest } from "@/app/lib/definitions";

const ItemTypes = {
    CUSTUMER: 'customer',
}

export default function Customers() {


    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const isDateBeforeToday = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const [dates, setValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const readOnly = isDateBeforeToday(dates.endDate);
    const [customers, setCustomers] = useState([]);

    const MIN_DATE = new Date();
    MIN_DATE.setDate(MIN_DATE.getDate());


    async function handleState(newValue: any) {

        const formattedDate = formatDate(newValue.startDate);
        router.push(`/dashboard/customers?date=${formattedDate}`);
        fetchCustomers(new Date(formattedDate))
        setValue(newValue);
    }

    async function fetchCustomers(date: any) {
        setLoading(true);
        try {
            const r = await getCustomers(new Date(date))
            setCustomers(r)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    async function isServed(customer: any, index: number) {
        const dateParam = formatDate(dates.endDate)
        const _ = await editCustomerOrder({ ...customer, is_served: true })
        const r = await getCustomers(new Date(dateParam))
        setCustomers(r)
    }


    useEffect(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
            handleState({ startDate: new Date(dateParam), endDate: new Date(dateParam) });
        } else {
            handleState({ startDate: new Date(), endDate: new Date() }); // Set to today's date if no date param
        }
    }, []);

    const moveItem = useCallback(async (dragIndex: number, hoverIndex: number, customers: any) => {
        const dateParam = formatDate(dates.endDate)

        const _ = await changeCustomersOrder(new Date(dateParam), customers[dragIndex].id, customers[hoverIndex].id)
        const reorderedCustomers = await getCustomers(new Date(dateParam))

        setCustomers(reorderedCustomers)
    }, [])


    return (
        <div>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Manage Requests</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-6 md:mt-8">

                    <Datepicker

                        useRange={false}
                        asSingle={true}
                        primaryColor={"blue"}
                        value={dates}
                        onChange={newValue => handleState(newValue)}
                    />

                    <CreateRequest date={dates.startDate.toISOString().split('T')[0]} />
                </div>
            </div>


            <DndProvider backend={HTML5Backend}>
                {/* Basic Table */}
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="mt-8 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dog Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Arrival Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Is Served
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan={4}>Loading...</td></tr>
                                ) : customers.map((customer: PuppyRequest, index: number) => (
                                    <CustumerRow
                                        key={customer.id}
                                        customer={customer}
                                        index={index}
                                        moveItem={moveItem}
                                        isServed={isServed}
                                        customers={customers}
                                        date={dates.endDate}
                                        readOnly={readOnly}
                                    />
                                ))}

                            </tbody>
                        </table>
                    </div>
                </Suspense>
            </DndProvider>

        </div>
    );
}