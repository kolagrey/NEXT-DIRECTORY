import * as z from "zod";
import { parsePhoneNumberWithError } from "libphonenumber-js";

const MAX_LOGO_SIZE = 2 * 1024 * 1024; // 2MB

const teamMemberSchema = z.object({
  fullname: z.string().min(1, "Name is required"),
  job_role: z.string().min(1, "Job role is required"),
  twitter: z
    .string()
    .regex(/^[A-Za-z0-9_]{1,15}$/, "Invalid Twitter/X username format")
    .optional()
    .transform((str) => (str === "" ? undefined : str)),
});

const fileSchema = z
  .custom<File>((file) => file instanceof File, {
    message: "Please upload a file",
  })
  .refine((file) => {
    if (!(file instanceof File)) return false;
    return ["image/jpeg", "image/png"].includes(file.type);
  }, "Only JPEG and PNG files are allowed");

const portfolioItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
});

export const agencyFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(160, "Short description must be less than 200 characters"),
  fullDescription: z
    .string()
    .min(50, "Full description must be at least 50 characters")
    .max(2000, "Full description must be less than 2000 characters"),
  email: z.string().email("Invalid email address"),
  telephone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      if (val.length < 6) return false; // Basic length check
      
      try {
        const phoneNumber = parsePhoneNumberWithError(val.startsWith('+') ? val : '+' + val);
        return phoneNumber.isValid();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return false;
      }
    }, "Invalid phone number")
    .transform((val) => {
      if (!val) return null;
      const phoneNumber = parsePhoneNumberWithError(val.startsWith('+') ? val : '+' + val);
      return phoneNumber.format('E.164'); // Standardize format
    }),
  twitter: z.string().min(1, 'Please provide X/Twitter handle.'),
  linkedin: z.string().min(1, 'Please provide LinkedIn URL.'),
  founded: z.string().min(1, 'Please select a year.'),
  projects_completed: z.string().min(1, 'Please select projects completed.'),
  website: z.string().url("Invalid website URL"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  logo: fileSchema.refine(
    (file) => !file || file.size <= MAX_LOGO_SIZE,
    `Logo must be less than ${MAX_LOGO_SIZE / (1024 * 1024)}MB`
  ),
  pitch_video_url: z.string().url("Invalid video URL").optional(),
  team: z.array(teamMemberSchema).min(1, "Provide at least one team member"),
  portfolio: z.array(portfolioItemSchema).min(1, "Provide at least one project"),
  location: z.string().min(1, 'Please select a location.'),
  team_size: z.string().min(1, 'Please select a team size.'),
  starting_budget: z.string().min(1, 'Please select a starting budget.'),
  slug: z.string().optional(),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;
export type PortfolioItemFormValues = z.infer<typeof portfolioItemSchema>;
export type AgencyFormValues = z.infer<typeof agencyFormSchema>;
