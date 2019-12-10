
interface Dropdown {
    alertWithType : Function 
}

class Defaults {
    _dropdown! : Dropdown;
    _FCMToken! : string | null;
    _token : null | string= '';
    _activeRoute! :string;
    _locale : null | string = '';
    _location : null | Object = null;

    set dropdown(dropdown) {
        this._dropdown = dropdown;
    }

    get dropdown(): Dropdown {
        return this._dropdown;
    }
    set FCMToken(_FCMToken) {
        this._FCMToken = _FCMToken;
    }
    get FCMToken() : string | null {
        return this._FCMToken;
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
}

export default new Defaults();
