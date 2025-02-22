import { userRouter } from "@/server/api/routers/user";
import { pioneerRouter } from "@/server/api/routers/pioneer";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { sessionRouter } from "./routers/session";
import { bookingRouter } from "./routers/booking";
import runCronJob from "../cronJob";


runCronJob();
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  pioneer: pioneerRouter,
  session: sessionRouter,
  booking: bookingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
