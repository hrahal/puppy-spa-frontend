"use client";


import { useDrag, useDrop } from "react-dnd";
import { DeleteRequest, UpdateRequest } from "@/app/ui/customers/buttons";
import { PuppyRequest } from "@/app/lib/definitions";

const ItemTypes = {
    CUSTUMER: 'customer',
};

export default function CustumerRow(
    { customer, index, moveItem, isServed, customers, date, readOnly }:
        {
            customer: PuppyRequest; index: number;
            moveItem: (dragIndex: number, hoverIndex: number, customers: PuppyRequest[]) => Promise<void>;
            isServed: (customer: any, index: number) => Promise<void>; customers: any; date: Date; readOnly: boolean;
        }
) {

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CUSTUMER,
        item: { id: customer.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => !readOnly,
    });


    const [_, drop] = useDrop({
        accept: ItemTypes.CUSTUMER,
        drop: (draggedItem: any) => {
            const hoverIndex = index;

            if (draggedItem.index != hoverIndex) {
                moveItem(draggedItem.index, index, customers);
            }
        },
        canDrop: () => !readOnly,
    });

    const arrivalTime = new Date(customer.arrival_time)
        .toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', hour12: false
        });

    return (
        <tr
            // @ts-expect-error:
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="bg-white divide-y divide-grey-200"
        >

            <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{customer.first_name} {customer.last_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{customer.dog_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{arrivalTime}</td>
            <td className="px-6 py-4 whitespace-nowrap">{customer.service.join(", ")}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center mb-4">
                    <input
                        id="default-checkbox" type="checkbox"
                        // @ts-expect-error: No declaration file for module
                        value={customer.is_served}
                        onChange={() => isServed(customer, index)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        disabled={readOnly}
                        checked={customer.is_served} />
                </div>
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="cursor-move flex items-center justify-center" draggable="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical h-5 w-5 text-muted-foreground">
                        <circle cx="9" cy="12" r="1"></circle>
                        <circle cx="9" cy="5" r="1"></circle>
                        <circle cx="9" cy="19" r="1"></circle>
                        <circle cx="15" cy="12" r="1"></circle>
                        <circle cx="15" cy="5" r="1"></circle>
                        <circle cx="15" cy="19" r="1"></circle>
                    </svg>
                </div>
            </td>
            <td>
                <div className="flex justify-end gap-2">
                    {/*@ts-expect-error: */}
                    {!readOnly && <UpdateRequest id={customer.id} />}
                    {!readOnly && <DeleteRequest id={customer.id} date={date} />}
                </div>
            </td>

        </tr>
    );
};
