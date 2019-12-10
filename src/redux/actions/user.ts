
export const USER  = "USER"



interface userState {
    type: typeof USER,
    payload: Object,
}

export const RegisterPasswordDone = (data : Object) : userState => {
    return {
      type: USER,
      payload: data,
    };
  };
  