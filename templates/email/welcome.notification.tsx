import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeNotificationEmailProps {
  agencyName: string;
  previewLink: string;
  email: string;
}

export const WelcomeNotificationEmail = ({
  email,
  agencyName,
  previewLink,
}: WelcomeNotificationEmailProps) => {
  const previewText = `Your agency ${agencyName} has been successfully listed on FAATLIST!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to FAATLIST!</Heading>
          <Text style={text}>
            Congratulations! Your AI agency, <strong>{agencyName}</strong>, has
            been successfully listed on FAATLIST.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={previewLink}>
              View Your Listing
            </Button>
          </Section>
          <Text style={text}>
            We&apos;re excited to have you as part of our growing community of
            AI agencies. Your listing will be live and visible to potential
            clients searching for AI expertise as soon as we verify and publish
            your listing on FAATLIST.
          </Text>
          <Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{" "}
              <span className="text-black">{email}</span>. This invite was sent
              by <span className="text-black">FAATLIST</span>. If you were not
              expecting this invoice, you can ignore this email. If you are
              concerned about your account&apos;s safety, please reply to this
              email to get in touch with us.
            </Text>
          </Section>
          <Text style={footer}>
            © {new Date().getFullYear()} FAATLIST. All rights reserved.
            <br />
            <Link href="https://faatlist.com" style={link}>
              faatlist.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeNotificationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  paddingTop: "32px",
  paddingBottom: "16px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  paddingBottom: "16px",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const link = {
  color: "#5F51E8",
  textDecoration: "underline",
};
