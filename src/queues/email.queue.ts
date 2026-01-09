// src/queue/email.queue.ts
import { Queue } from 'bullmq';
import { redisConnectionQueue } from './connection';

export interface SendEmailJob {
  to: string;
  name: string;
  subject: string;
  templateName: string;
}

export const emailQueue = new Queue<SendEmailJob>('user-activation-mail', {
  connection: redisConnectionQueue,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
