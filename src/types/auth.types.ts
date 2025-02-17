enum ERole {
    USER = "USER",
    DRIVER = "DRIVER",
  }
  enum EDriverStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
      REJECTED = "REJECTED",
    }
enum EGender {
  MALE = "MALE",
    FEMALE = "FEMALE",
  }

  type TAccessTokenPayload={
    user_id:string,
    expiresIn:string
  }
  type TRefreshTokenPayload={
    user_id:string,
    expiresIn:string
  }
  enum EChannel {
    WEB = "WEB",
    GOOGLE = "GOOGLE",
    MICROSOFT = "MICROSOFT",
    FACEBOOK = "FACEBOOK",
  }
enum EActionType {
    LOGIN = "LOGIN",
    SIGNUP = "SIGNUP",
  }
enum EAuthStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
  }

  export {
    EChannel,
    EActionType,
    EAuthStatus,
  }

  export {ERole,EGender,EDriverStatus}
  export type {TAccessTokenPayload,TRefreshTokenPayload}