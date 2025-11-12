import * as z from "zod";

export const LoginScheme = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Minimum length 6").max(20, "Maximum length 20"),
});

export type LoginSchemeType = z.infer<typeof LoginScheme>;
