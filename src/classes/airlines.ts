export interface IAirline {
    IdAirline: string;
    Name: string;
}

export function defaultIAirline(): IAirline {
    return {
        IdAirline: '',
        Name: ''
    };
}