import { Worker } from 'bullmq';
import { SendEmailJob } from '../queues/email.queue';
import { createOtp } from '../libs/crypto.lib';
import { sendEmail } from '../services/email/sendMail';
import { otpService } from '../services/redis/otpSevice';
import { redisConnectionQueue } from '../queues/connection';

export const emailWorker = new Worker<SendEmailJob>(
  'otp-activation-queue', // queue name
  async (job) => {
    const { to, name, subject, templateName } = job.data;
    const otp = createOtp();
    await sendEmail(to, subject, templateName, { to, otp, name });
    await otpService.setOtp(to, otp);
    await otpService.setOtpCooldown(to);
  },
  {
    connection: redisConnectionQueue,
    concurrency: 5,
  }
);

emailWorker.on('completed', (job) => {
  console.log(`Email completed for job ${job?.id}`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Email failed for job ${job?.id}`, err);
});
