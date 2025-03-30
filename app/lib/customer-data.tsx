import { CreatePuppyRequest, PuppyService } from "./definitions";
import { formatDate } from "./utils";
import { PuppyRequest } from "./definitions";


// TBD: get from Config
const spaApiUrl = "http://localhost:8080"

const isDateBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
};

export async function getCustomers(date: Date, isServed: boolean = false) {
    return fetch(`${spaApiUrl}/api/puppy-requests?date=${formatDate(date)}`)
        .then((response) => response.json())
        .then((data) => {
            if (isDateBeforeToday(date)) {
                return data
            }
            return data.filter((req: PuppyRequest) => req.is_served === isServed)
        });
}

export async function getCustomerById(id: number) {
    return fetch(`${spaApiUrl}/api/puppy-requests/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data
        });
}

export async function changeCustomersOrder(date: Date, fromId: number, toId: number) {
    return await fetch(`${spaApiUrl}/api/change-order/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: formatDate(date),
            fromId: fromId,
            toId: toId
        })
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        });
}

export async function editCustomerOrder(custumerReq: PuppyRequest) {
    return await fetch(`${spaApiUrl}/api/puppy-requests/${custumerReq.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(custumerReq)
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        });
}


export async function deleteRequestById(id: number) {
    return await fetch(`${spaApiUrl}/api/puppy-requests/${id}`, {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        });
}

export async function createCustomersOrder(custumerReq: CreatePuppyRequest) {
    return await fetch(`${spaApiUrl}/api/puppy-requests/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(custumerReq)
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        });
}