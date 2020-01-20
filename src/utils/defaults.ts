import {CustomModalInterface} from "../components/customModal"
import {RefObject} from "react"
import BottomSheetBehavior from "reanimated-bottom-sheet";

type userDetail = {
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    verified: number,
    id: number
} | null

class Defaults {
    _dropdown : any = null;
    _FCMToken! : string | null;
    _token : null | string = '';
    _activeRoute! :string;
    _locale : null | string = '';
    _location : null | Object = null;
    _modal : any = null;
    _bottomSheet : any = null;
    _userDetail : userDetail = null;

    set dropdown(dropdown) {
        this._dropdown = dropdown;
    }
    get dropdown() {
        return this._dropdown;
    }

    set FCMToken(_FCMToken) {
        this._FCMToken = _FCMToken;
    }
    get FCMToken() : string | null {
        return this._FCMToken;
    }

    set userDetail(token) {
        this._userDetail = token;
    }
    get userDetail() : userDetail {
        return this._userDetail;
    }
    set token(token) {
        this._token = token;
    }
    get token() {
        return this._token;
    }

    set activeRoute(route) {
        this._activeRoute = route;
    }
    get activeRoute() {
        return  this._activeRoute;
    }

    set locale(locale) {
        this._locale = locale;
    }
    get locale() {
        return  this._locale;
    }

    set location(location) {
        this._location = location;
    }
    get location() {
        return  this._location;
    }
    
    set modal(modal) {
        this._modal = modal;
    }
    get modal() : RefObject <CustomModalInterface> {
        return  this._modal;
    }
    set bottomSheet(bottomSheet) {
        this._bottomSheet = bottomSheet;
    }
    get bottomSheet() : React.RefObject<BottomSheetBehavior> | null {
        return  this._bottomSheet;
    }
}

export default new Defaults();
