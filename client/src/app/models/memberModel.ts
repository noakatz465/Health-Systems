
export interface MemberModel{
    firstName: string;
    lastName: string;
    idNumber: string;
    address: AddressModel;
    dateOfBirth: Date | null;
    phone: string;
    mobile: string;
    vaccinations: Vaccination[];
    positiveTestDate: Date | null;
    recoveryDate: Date | null;
    image: string |null;
}

export interface Vaccination {
    manufacturer: string;
    dateReceived: Date | null;
}

export interface AddressModel {
    city: string;
    street: string;
    number: string;
}