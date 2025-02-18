
// export type TLocationConfig = {
//     type?:'from' | 'to';
//     chooseFromMap?: boolean;
// }
// export type TUpdateLocationConfig = {
//   from?:{
//     chooseFromMap: boolean;
//     currentLocation: boolean;
//   },
//   to?:{
//     chooseFromMap: boolean;
//     currentLocation: boolean;
//   }
// }
// export type TUserOrderConfig = {
//   from:{
//     chooseFromMap: boolean;
//     currentLocation: boolean;
//     position:{latitude:number,longitude:number} | null
//   },
//   to:{
//     chooseFromMap: boolean;
//     currentLocation: boolean;
//     position:{latitude:number,longitude:number} | null

//   }
// }
// export type TUpdateUserOrderConfig = {
//   from?:{
//     chooseFromMap: boolean;
//     currentLocation: boolean;
//     position:{latitude:number,longitude:number} | null
//   },
//   to?:{
//     chooseFromMap: boolean;
//     currentLocation: boolean;
//     position:{latitude:number,longitude:number} | null
//   }
// }

// export type TDriveConfig = {
//   radius:number;
//   minutesRange: number;
// }
// export type TUpdateDriveConfig = {
//   radius?:number;
//   minutesRange?: number;
// }

// // Define the state structure
// export interface IDomainState {
//     calendar: any;
//     locationConfig: TLocationConfig;
//     driveMapConfig:TDriveConfig
//     userOrderConfig:TUserOrderConfig
//   }
  
//   // Define the state with value and isPending properties
//   export type ICalendarState = {
//     [k in keyof IDomainState]: {
//       value: IDomainState[k];
//       isPending: boolean;
//     };
//   };
  
//   // Define the actions that can be performed on the store
//   export interface ICalendarActions {
//     createNewCalendar: () => void;
//     handleGetCurrentLocation: (type:'from' | 'to') => Promise<void>;
//     flush:(keys: Array<keyof ICalendarState>)=> void;
//     updateDriveConfig:(options: TUpdateDriveConfig)=> void;
//     handleChangeUserOrderConfig:(options:TUpdateUserOrderConfig) => void;
//   }
  
//   // Combine state and actions into the store type
//   export interface ICalendarStore extends ICalendarState, ICalendarActions {}
  
//   // Define the type for the set function
//   export type ICalendarStoreSet = (arg0: Partial<ICalendarState>) => void;
  