import { EDriverStatus, ERole } from "./auth.types"

export type TUser = {
    user_id: string,
    username: string,
    email: string,
    gender: 'MALE' | 'FEMALE',
    createdAt: string,
    updatedAt: string,
    role: {
      user_role_id: string,
      name: ERole
    },
    driver?: {
      driver_id: string,
      user_id: string,
      license_number: string,
      status: EDriverStatus
    },
    user_role_id: string,
    verified: boolean
    isDriver: boolean,
    isUser: boolean
  }
