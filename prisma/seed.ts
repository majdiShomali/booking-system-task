import { PrismaClient} from "@prisma/client";
import { fromZonedTime} from "date-fns-tz";

enum ERole {
  USER = "USER",
  PIONEER = "PIONEER",
}

const prisma = new PrismaClient();

const convertHourToIso = (hour: number, timeZone: string) => {
  const localTodayDate = new Date();
  localTodayDate.setHours(hour, 0, 0, 0);
  const utcDate = fromZonedTime(localTodayDate, timeZone);
  return utcDate.toISOString();
};

const isSessionAvailable = (sessionIsoDate: string) => {
  const sessionDate = new Date(sessionIsoDate);
  const nowUtc = new Date();
  return sessionDate > nowUtc;
};

async function createUser(userData: any) {
  return prisma.user.upsert({
    where: { email: userData.email },
    update: {},
    create: { ...userData },
  });
}

async function createPioneer(pioneerData: any) {
  return prisma.pioneer.upsert({
    where: { user_id: pioneerData.user_id },
    update: {},
    create: { ...pioneerData },
  });
}
async function createSessions(sessionData: any) {
  const existingSession = await prisma.availableSession.findUnique({
    where: {
      pioneer_id_date: {
        pioneer_id: sessionData.pioneer_id,
        date: sessionData.date,
      },
    },
  });

  if (existingSession) {
    return prisma.availableSession.update({
      where: {
        id: existingSession.id,
      },
      data: {
        ...sessionData,
      },
    });
  } else {
    return prisma.availableSession.create({
      data: {
        ...sessionData,
      },
    });
  }
}

async function main() {
  try {
    const userData = [
      {
        email: "saraahmad@gmail.com",
        name: "سارة احمد",
        hash: "1e58254504079e3d5ecaeb9736e7a37f785949ce530d13001ee439d2188acadf6c3cabbc91f1f12b9a3cadb071ee3bd1fc57b32555900a470e4a67380b337ac7f914dab2c7a6c3cec562f0290fe1d4b1f3aba6b4a5255117d8e20c5b1cff05a3887bd505f73ba502a23eb3fb1c0ebe4488437c2a45192d1406e8c515d3ec36afa5e83ae506d94f4e8b57a9951cc364c4f04da18864c611343c98efbdeafc5cc98b7460cb16b04d043e5a1050267182cb94428745403f0082b489aa254dceba66bb3c9666b3bad917937df6afc6b1f6511eead657423d35b1dd7fc91e215803ea4c750ebe5c48a2951913f67f8e328e19901da8698d102d14ce528d42d30169856aa716ab150b1e5718cbb225683a631c95bae50b623dce488b57bba964c5e427349aa7efa9415beeb2749456919e97366ff25961e50b6b8da624fd710c350565797c07054dea34560ea4ee94a07a32793c2027650f3e313560179c6db439f4d158022ee256b5cc8e6c94735eed14f6dbe31d27b108d0f411718b103793bf74c3ed3f87a95efa2fec706406eb6ceaa67b39f453510917aae5e32bb66083d77eb6e3e80141c02c3fef502c29e0ba024da21cafe6727f979984641412e991c74cca107ec140652cf637895c9a396e5e234d18a42bff633ad8d355ab2dccacfb665936ef828b6ebee74c94d16babbd87492228a7677dbad59ebe0b96796156b936a2",
        salt: "68d0ec08676a640f59a406a0fdfd218f",
        image: "/avatars/sara.png",
        role: ERole.PIONEER,
      },
    ];

    const users = await Promise.all(userData.map(createUser));
    const saraAhmad = users.find(
      (user) => user.email === "saraahmad@gmail.com",
    );

    if (!saraAhmad) {
      throw new Error("User creation failed, missing Sara Ahmad.");
    }

    const pioneersData = [
      {
        title: "مؤسسي ، مستشار ، تدريب على أمور شركات التقنية",
        bio: "متخصص في تطوير وإدارة المنتجات الرقمية. مهني في البرامج وله عدة تجارب فيه. مستشار معتمد ومقدم بودكاست السوالف برنس.",
        available: true,
        skills: [
          "e-com اشتراك",
          "اعتماد الوسائط الرقمية / المنصة",
          "بناء و تطوير كود5",
          "الاستثمار المبكر",
          "استراتيجيات نمو تويتر",
          "بناء المجتمع",
        ],
        facebook: "https://www.facebook.com",
        instagram: "https://www.instagram.com",
        twitter: "https://twitter.com",
        additional_information: [
          "أحب مشاهدة الآخرين ، وخاصة رواد الأعمال الجامعين.",
          "توسيع نطاق مجتمع المؤسسين الخاص حالياً.",
        ],
        session_duration: 60,
        experience: 35,
        user_id: saraAhmad.id,
      },
    ];

    const pioneers = await Promise.all(pioneersData.map(createPioneer));

    const saraAhmadInfo = pioneers.find(
      (pioneer) => pioneer.user_id === saraAhmad.id,
    );
    const saraTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const saraHourSessions = [9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23];
    const saraAvailableSessions = saraHourSessions?.map((hour) => {
      const date = convertHourToIso(hour, saraTimeZone);
      return {
        date: date,
        available: isSessionAvailable(date),
        pioneer_id: saraAhmadInfo?.id ?? "",
        time_zone: saraTimeZone,
      };
    });

    const sessions = await Promise.all(
      saraAvailableSessions.map(createSessions),
    );

    console.log("Seeding completed!🪧");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
