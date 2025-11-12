import * as z from "zod";

export const RegisterScheme = z
  .object({
    name: z.string().min(3, "Minimum length 3").max(10, "Maximum length 10"),
    email: z.email("Invalid Email"),
    password: z
      .string()
      .min(6, "Minimum length 6")
      .max(20, "Maximum length 20"),
    rePassword: z.string().min(6).max(20),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Phone Number"),
  })
  .refine(
    function (object) {
      if (object.password === object.rePassword) {
        return true;
      }
      return false;
    },
    {
      path: ["rePassword"],
      error: "Password Doesn't match",
    }
  );

export type RegisterSchemeType = z.infer<typeof RegisterScheme>;
