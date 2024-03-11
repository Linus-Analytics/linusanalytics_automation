interface CustomerData {
    customerName: string;
    customerAddress: string;
    customerCity: string;
    customerCountry: string;
    customerState: string;
    customerZipCode: string;
    customerPhoneNumber: string;
}

interface FacilityData {
    facilityCustomerName: string;
    facilityName: string;
    facilityStreet1: string;
    facilityStreet2: string;
    facilityCity: string;
    facilityCountry: string;
    facilityState: string;
    facilityZipCode: string;
    facilityWeight: string;
}

interface ScaleData {
    Id: string;
    scaleId: string;
    scaleName: string;
}

interface TestData {
    customerData: CustomerData;
    facilityData: FacilityData;
    scaleData: ScaleData;
}

const testData: TestData = {
    customerData: {
        customerName: 'Pedro A. Reuter',
        customerAddress: '5600 20th Ave NW',
        customerCity: 'Seattle',
        customerCountry: 'United States',
        customerState: 'Washington',
        customerZipCode: '98107',
        customerPhoneNumber: '+1(206) 686-7440',
    },
    facilityData: {
        facilityCustomerName: 'Alex User Services',
        facilityName: "Alex Facility Services",
        facilityStreet1: "211 Banff Ave",
        facilityStreet2: "Banff",
        facilityCity: 'Kabul',
        facilityCountry: 'Afghanistan',
        facilityState: 'Kabul',
        facilityZipCode: "3456463",
        facilityWeight: "10 kg"
    },
    scaleData: {
        Id: '12345',
        scaleId: "13245",
        scaleName: "Alex Scale"
    }
};

export default testData;
