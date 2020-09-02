export  interface ClientValue {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    firstContact: Date,
    emailType?: string | null,
    sold: boolean,
    owner: any,
    country: string,
}


export interface ClientNamesType {
    id: string,
    name: string
}