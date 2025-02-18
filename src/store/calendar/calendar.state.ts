// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// import {
//   ICalendarState,
//   ICalendarStoreSet,
//   ICalendarStore,
//   TLocationConfig,
//   TMapConfig,
//   TDriveConfig,
//   TUpdateDriveConfig,
//   TUpdateUserOrderConfig,
// } from "./calendar.types";

// import service from "./calendar.service";
// import mapHelper from "@/helper/map.helper";
// import { LatLngExpression } from "leaflet";

// const initialState: ICalendarState = {
//   calendar: {
//     value: null,
//     isPending: false,
//   },
//   currentLocation: {
//     value: {type:"from",location: null},
//     isPending: false,
//   },
//   fromLocation: {
//     value: null,
//     isPending: false,
//   },
//   toLocation: {
//     value: null,
//     isPending: false,
//   },
//   locationConfig: {
//     value: {
//       type: "from",
//       chooseFromMap: false,
//     },
//     isPending: false,
//   },
//   userOrderConfig: {
//     value: {
//       from:{
//         chooseFromMap: false,
//         currentLocation: false,
//         position: null
//       },
//       to:{
//         chooseFromMap: false,
//         currentLocation: false,
//         position: null
//       },
//     },
//     isPending: false,
//   },
//   mapConfig: {
//     value: {
//       zoom: 10,
//       center: [31.9443786, 35.9105776],
//     },
//     isPending: false,
//   },
//   driveMapConfig: {
//     value: {
//       radius: 1000,
//       minutesRange:30
//     },
//     isPending: false,
//   },
// };
// // Define the store
// const CalendarStore = (set: ICalendarStoreSet, get: () => ICalendarStore) => ({
//   ...initialState,
//   flush(keys: Array<keyof ICalendarState>) {
//     const obj: any = {};
//     for (var i = 0; i < keys.length; i++) {
//       obj[keys[i]] = { ...initialState[keys[i]] };
//     }
//     set({ ...obj });
//   },
//   // Action to get the current location
//   async handleGetCurrentLocation(type: "from" | "to") {
//     try {
//       const currentLocation = await mapHelper.handleGetCurrentLocation();
//       const location = mapHelper.parseLocation(currentLocation);
//       if (!location) return;
//       const mapConfig = get().mapConfig?.value;
//       const userOrderConfig = get().userOrderConfig.value
//       set({
//         userOrderConfig: {
//           value: {
//          ...userOrderConfig,
//          [type]:{
//             chooseFromMap: false,
//             currentLocation: true,
//             position: {
//               latitude: location.lat,
//               longitude: location.lng,
//             }
//             }
//           },
//           isPending: false,
//         },
//       });
//       set({
//         mapConfig: {
//           value: {
//             ...mapConfig,
//             center:[Number(location.lat), Number(location.lng)],
//             zoom:50
//           },
//           isPending: false,
//         },
//       });
//       set({
//         currentLocation: {
//           value:{type,location:[Number(location.lat), Number(location.lng)]} ,
//           isPending: false,
//         },
//       });
//       if (type === "from") {
//         set({
//           fromLocation: {
//             value: [Number(location.lat), Number(location.lng)],
//             isPending: false,
//           },
//         });
//       }
//       if (type === "to") {
//         set({
//           toLocation: {
//             value: [Number(location.lat), Number(location.lng)],
//             isPending: false,
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching location:", error);
//     }
//   },
//   handleSelectFromLocation(result: LatLngExpression | null) {
//     try {
//       const location = mapHelper.parseLocation(result);
//       if (!location) return;
//       const mapConfig = get().mapConfig?.value;

//       set({
//         mapConfig: {
//           value: {
//             ...mapConfig,
//             center:[Number(location.lat), Number(location.lng)],
//           },
//           isPending: false,
//         },
//       });
//       set({
//         fromLocation: {
//           value: [Number(location.lat), Number(location.lng)],
//           isPending: false,
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching location:", error);
//     }
//   },
//   handleSelectToLocation(result: LatLngExpression | null) {
//     try {
//       const location = mapHelper.parseLocation(result);
//       if (!location) return;
//       const mapConfig = get().mapConfig?.value;

//       set({
//         mapConfig: {
//           value: {
//             ...mapConfig,
//             center:[Number(location.lat), Number(location.lng)],
//           },
//           isPending: false,
//         },
//       });
//       set({
//         toLocation: {
//           value: [Number(location.lat), Number(location.lng)],
//           isPending: false,
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching location:", error);
//     }
//   },

//   handleChangeLocationConfig(options: TLocationConfig) {
//     const locationConfig = get().locationConfig?.value;
//     const updatedConfig = { ...locationConfig, ...options };
//     set({
//       locationConfig: {
//         value: {
//           ...updatedConfig,
//         },
//         isPending: false,
//       },
//     });
//   },
  
//   handleChangeUserOrderConfig(options: TUpdateUserOrderConfig) {
//     const userOrderConfig = get().userOrderConfig?.value;
//     const updatedConfig = { ...userOrderConfig, ...options };
//     set({
//       userOrderConfig: {
//         value: {
//           ...updatedConfig,
//         },
//         isPending: false,
//       },
//     });
//   },
//   handleChangeMapConfig(options: TMapConfig) {
//     const mapConfig = get().mapConfig?.value;
//     const updatedConfig = { ...mapConfig, ...options };
//     set({
//       mapConfig: {
//         value: {
//           ...updatedConfig,
//         },
//         isPending: false,
//       },
//     });
//   },
//   // Action to create a new calendar (placeholder implementation)
//   createNewCalendar() {
//     // Implementation goes here
//   },
//   updateDriveConfig(options:TUpdateDriveConfig) {
//     const driveConfig = get().driveMapConfig?.value;
//     const updatedConfig = { ...driveConfig, ...options };
//     set({
//       driveMapConfig: {
//         value: {
//           ...updatedConfig,
//         },
//         isPending: false,
//       },
//     });
//   },
// });

// // Create the store with persistence
// const useCalendarStore = create(
//   persist<ICalendarStore>(CalendarStore, {
//     name: "calendar",
//     partialize: (state) => {
//       const { ...partialState } = state;
//       return partialState;
//     },
//   })
// );

// export { useCalendarStore, CalendarStore };
