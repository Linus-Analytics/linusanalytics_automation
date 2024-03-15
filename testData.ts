interface TestData {
    customerData: CustomerData;
    facilityData: FacilityData;
    scaleData: ScaleData;
    binData: binData;
    commodityData: CommodityData;
    machinetypeData: MachinetypeDate;
    machineData: MachineData;

}

interface MachineData {
    MachineName: string;
    
}

interface CustomerData {
    customerName: string;
    customerAddress: string;
    customerAddress2: string;
    customerCountry: string;
    customerState: string;
    customerCity: string;
    customerZipCode: string;
    customerPhoneNumber: string;
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

interface binData{

    binName: string;
    maxCapacity: string;
    capacityThreshold: string;

}
interface CommodityData{

    commodityName: string;
}

interface MachinetypeDate{

    machinetypeName: string;
}

const testData: TestData = {

    machineData:{

        MachineName: "Machine",
    },


    customerData: {

        customerName: 'Abraham',
        customerAddress: '2F, 4035-1 Ikenobecho, Tsuzuki-ku, Yokohama',
        customerAddress2: '47 W 13th St, New York, NY 10011',
        customerCountry: 'Japan',
        customerState: 'Kanagawa Prefecture',
        customerCity: 'Yokohama',
        customerZipCode: '2200001',
        customerPhoneNumber: '+1(926) 221-0824',
    },
    facilityData: {
        facilityName: "Facility",
        contactName: "Mavric",
        facilityCity: 'Kabul',
        facilityCountry: 'Afghanistan',
        facilityState: 'Kabul',
        facilityZipCode: "3456463",
        facilityWeight: "10 kg"
    },
    scaleData: {

        scaleId: "SCa316Oye",
        scaleName: "Scale"
    },

    binData: {

        binName: "Bin",
        maxCapacity: "5000",
        capacityThreshold: "80"
    },

    commodityData:{
        commodityName: "Natural Gas",
    },

    machinetypeData:{
        machinetypeName: "Natural Gas",
    },

};

export default testData;
