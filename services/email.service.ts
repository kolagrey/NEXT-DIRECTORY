import { Resend } from "resend";

import config from "@/config";
import { WelcomeNotificationEmail } from "@/templates/email/welcome.notification";

const resend = new Resend(config.resend.apiKey);

export const sendWelcomeEmail = async ({
  agencyName,
  previewLink,
  email,
}: {
  agencyName: string;
  previewLink: string;
  email: string;
}) => {
  await resend.emails.send({
    from: config.resend.fromNoReply,
    to: email,
    subject: "Welcome to FAATLIST",
    react: WelcomeNotificationEmail({
      agencyName,
      previewLink,
      email,
    }),
  });
};
