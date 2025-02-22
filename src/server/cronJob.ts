import cron from 'node-cron';
import { db } from './db';

const runCronJob = () => {
  const scheduledTask = cron.schedule('* * * * *', () => {
    (async () => {
      try {
        const expiredSessions = await db.availableSession.findMany({
          where: {
            date: { lt: new Date().toISOString() },
            available: true,
          },
        });

        if (expiredSessions.length > 0) {
          await db.availableSession.updateMany({
            where: { id: { in: expiredSessions.map(session => session.id) } },
            data: { available: false },
          });
          console.log(`${expiredSessions.length} sessions marked as unavailable.`);
        }
      } catch (error) {
        console.error('Error updating sessions:', error);
      }
    })();
  });

  return scheduledTask;
};

export default runCronJob;