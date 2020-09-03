import { observable, action } from 'mobx';
import { Client } from "./Client";
import { ClientNamesType } from "../interfaces/client";
import { serverUrl } from '../config/generalConfig';
import { IQuery } from '../interfaces/navigation';
import axios from 'axios';
class ClientsStore {
    @observable clients: Client[] = [];
    @observable clientNames: ClientNamesType[] = [];
    @observable owners: ClientNamesType[] = [];
    @observable emails: string[];

    totalClients: number = 0;
    totalPages: number = 0;
    constructor() {
        this.emails = ['A', 'B', 'C', 'D'];
    }

    @action addClient(client: any) {
        const { id, firstName, lastName, email, firstContact,
            sold, owner, countryName, email_type, countryId } = client;
        const newClient = new Client(id, firstName, lastName, email, firstContact,
            email_type, sold, owner, countryName, countryId);
        this.clients.push(newClient)
    }

    @action getClientsWithPagination = async (query: IQuery) => {
        const { data } = await axios.get(this.getUrlWithQueryParams(query));
        this.totalClients = data.totalItems;
        this.totalPages = data.totalPages;
        this.clients = [];
        data.clients.forEach((c: any) => this.addClient(c));
    }

    @action updateCountryLocally = (countryId: number, newCountryName: string) => {
        this.clients.forEach((client: Client) => {
            if (client.countryId === countryId) {
                client.country = newCountryName;
            }
        })
    }

    private getUrlWithQueryParams = (query: IQuery): string => {
        const { page, size, searchBy, searchText } = query;
        const searchRoute = searchBy && searchText ? `&searchText=${searchText}&searchBy=${searchBy}` : "";
        return `${serverUrl}/api/clients?page=${page}&size=${size}${searchRoute}`
    }
}


export default ClientsStore;