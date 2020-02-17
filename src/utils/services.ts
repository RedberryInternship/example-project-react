const get_chargers_list = '/chargers';
const get_charger = (charger_id: number ): string => `/charger/${charger_id}`;
const get_models_and_marks = '/get-models-and-marks';
const get_phone_codes = '/phone-codes';
const post_register = '/register';
const post_login = '/login';
const post_send_sms_code = '/send-sms-code';
const post_verify_code = '/verify-code';
const post_verify_code_for_password_recovery = '/verify-code-for-password-recovery';
const post_reset_password = '/reset-password';
const post_edit_password = '/edit-password';
const post_add_user_car = '/add-user-car';
const post_delete_user_car = '/delete-user-car';
const get_user_cars = '/get-user-cars';
const post_add_charger_to_favorites = '/add-favorite';
const post_remove_charger_from_favorites = '/remove-favorite';
const get_user_favorite_chargers = '/user-favorites';
const post_update_user_info = '/update-user-info';
const get_city_based_on_current_location = '/https://api-dev.e-space.ge/api/app/V1/geo-ip';

export default{
  get_chargers_list,
  get_charger,
  get_models_and_marks,
  get_phone_codes,
  post_register,
  post_login,
  post_send_sms_code,
  post_verify_code,
  post_verify_code_for_password_recovery,
  post_reset_password,
  post_edit_password,
  post_add_user_car,
  post_delete_user_car,
  get_user_cars,
  post_add_charger_to_favorites,
  post_remove_charger_from_favorites,
  get_user_favorite_chargers,
  post_update_user_info,
  get_city_based_on_current_location
}