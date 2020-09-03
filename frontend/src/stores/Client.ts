import { stores } from './stores';
import { ClientValue } from "../interfaces/client";
import { observable, action } from 'mobx';
import { serverUrl } from '../config/generalConfig';
import axios from 'axios';

export class Client implements ClientValue {
    readonly id: string;
    @observable firstName: string;
    @observable lastName: string;
    @observable email: string;
    @observable firstContact: Date;
    @observable emailType: string | null | undefined;
    @observable sold: boolean;
    @observable owner: any;
    @observable country: string;
    @observable countryId: number;

    constructor(id: string, firstName: string, lastName: string, email: string, firstContact: Date,
        emailType: string, sold: boolean, owner: any, country: string, countryId: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.firstContact = firstContact;
        this.emailType = emailType;
        this.sold = sold;
        this.owner = owner;
        this.country = country;
        this.countryId = countryId;
    }

    @action update = async (firstName: string, lastName: string, country: string) => {
        const clientToUpdate = {
            ...this,
            firstName,
            lastName,
            country
        }

        const { data }: { data: ClientValue } = await axios.put(`${serverUrl}/api/clients/nameAndCountry`, clientToUpdate);
        if(data.country !== this.country) {
            this.updateAllCountries(data.countryId, data.country)
        }
        Object.keys(this).forEach((key: string) => {
            if (key !== 'id' && data[key as keyof ClientValue]) {
                this[key as keyof this] = data[key as keyof ClientValue]
            }
        })
    }
    
    private updateAllCountries = (countryId: number, newCountryName: string) => {
        const clients = stores.clientsStore
        clients.updateCountryLocally(countryId, newCountryName)
    }
}