enum EStatusCode {
    SUCCESS_CODE = 200,
    ERROR_CODE = 500,
    WRITE_SUCCESS_CODE = 201,
    BAD_REQUEST = 400,
    UNAUTH_CODE = 401,
    FORBIDDEN_CODE = 403,
    NOTFOUND_CODE = 404,
    CONFLICT_CODE = 409,
    UNPROCESSABLE_ENTITY = 422,
  }
  
  
  enum EKeys {
    isNotEmpty = 'isNotEmpty',
    isEmail = 'isEmail',
  }
  
  type TErrorMessage = {
    property: string;
    constraints: {
      [key in EKeys]?: string; 
    };
    keys: EKeys[]; 
    errors: string[]; 
  };
  
  type TERROR = {
    message: TErrorMessage[];
    error: EStatusCode;
    statusCode: EStatusCode; 
  };

  export type {TERROR}