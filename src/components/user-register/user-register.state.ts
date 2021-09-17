import { defaultIAirline, IAirline } from "../../classes/airlines";
import { defaultIUser, IUser } from "../../classes/user";

export interface UserRegisterState {
    model: IUser
    airlines: IAirline[];
    selectedAirline: IAirline;
}

export function defaultUserRegisterState(): UserRegisterState {
    return {
        model: defaultIUser(),
        airlines: [],
        selectedAirline: defaultIAirline()
    };
}