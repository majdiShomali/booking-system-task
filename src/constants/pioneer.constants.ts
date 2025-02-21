import { TPeriod } from "@/types/types";

const ADD_SESSION_TOAST_MESSAGES = {
    TIME_EXISTS: {
      title: "الوقت موجود مسبقًا",
      description: (hour:number, period:TPeriod) => `${hour} ${period} موجود بالفعل في القائمة.`,
    },
    TIME_ADDED: {
      title: "تم إضافة الوقت",
      description: (hour:number, period:TPeriod) => `تمت إضافة ${hour} ${period} إلى القائمة.`,
    },
    SESSION_CREATED: {
      title: "تم الإنشاء",
      description: "تم إنشاء الجلسة بنجاح",
    },
    INVALID_HOUR: {
      title: "وقت غير صالح",
      description: "الرجاء إدخال ساعة صحيحة بين 1 و 12.",
    },
    ERROR: {
      title: "خطأ",
      description: "حدث خطأ أثناء محاولة إنشاء الجلسة",
    },
  };

  const pioneerConstants = {ADD_SESSION_TOAST_MESSAGES}
  export default  pioneerConstants