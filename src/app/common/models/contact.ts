export interface ContactI {
    id: number;
    name: string;
    email: string;
    address: {
        street: string;
        city: string;
    },
    phone: string;
    website: string;
    company: string;
}

export interface EditDataI {
    element: ContactI;
    modalTitle: string;
}