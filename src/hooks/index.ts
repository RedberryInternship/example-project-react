import {useRoot} from "./rootRun"
import useMap from "./mapViewHook"
import useLocation from "./locationHook"
import useHomeHook from "./homeHook"
import useHomeMainInputHook from "./homeMainInputHook"

//authentication
import useAuthHook from "./authentication/authHook"
import useForgotPassword from "./authentication/forgotPassword"
import useRegistrationHook from "./authentication/registration/registrationHook"
import useSetNewPasswords from "./authentication/setNewPasswords"

//charger
import useCharger from "./charger/charger"
import useChoosingCard from "./charger/choosingCard"

//reducer
import rootReducer, {initialState} from "./reducers/rootReducer"


export {
    useRoot,
    useMap,
    useLocation,
    useHomeHook,
    useHomeMainInputHook,
    useAuthHook,
    useForgotPassword,
    useRegistrationHook,
    useSetNewPasswords,
    useCharger,
    useChoosingCard,
    rootReducer,
    initialState
}