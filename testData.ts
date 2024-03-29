interface TestData {
    customerData: CustomerData;
    facilityData: FacilityData;
    scaleData: ScaleData;
    binData: binData;
    commodityData: CommodityData;
    machinetypeData: MachinetypeDate;
    machineData: MachineData;
    hopperData: HopperData;

}

interface HopperData {
    HopperName: string;

}


interface MachineData {
    machineName: string;

}

interface CustomerData {
    customerName: string;
    streetAddress1: string;
    streetAddress2: string;
    countryName: string;
    state: string;
    city: string;
    zipCode: string;
    phoneNumber: string;
}

interface FacilityData {
    facilityName: string;
    contactName: string;
    facilityCity: string;
    facilityCountry: string;
    facilityState: string;
    facilityZipCode: string;
    facilityWeight: string;
}

interface ScaleData {
    scaleId: string;
    scaleName: string;
}

interface binData {

    binName: string;
    maxCapacity: string;
    capacityThreshold: string;
    newCapacity: string;

}
interface CommodityData {

    commodityName: string;
}

interface MachinetypeDate {

    machinetypeName: string;

}

const testData: TestData = {

    hopperData: {

        HopperName: "Hopper",
    },

    machineData: {

        machineName: "Machine",

    },

    customerData: {

        customerName: 'Auto',
        streetAddress1: '401 26th St',
        streetAddress2: '',
        countryName: 'United States',
        state: 'California',
        city: 'Oakland',
        zipCode: '94612',
        phoneNumber: '+1(510) 251-8009',
    },
    facilityData: {
        facilityName: "Facility",
        contactName: "Mavric",
        facilityCity: '',
        facilityCountry: '',
        facilityState: '',
        facilityZipCode: "",
        facilityWeight: ""
    },
    scaleData: {

        scaleId: "hagfd5ssfsdsRYW",
        scaleName: "Scale"
    },

    binData: {

        binName: "Bin",
        maxCapacity: "6372",
        capacityThreshold: "3s0",
        newCapacity: "2000",
    },

    commodityData: {
        commodityName: "Gold",
    },

    machinetypeData: {
        machinetypeName: "Cross",
    },

};

export default testData;
