import type { z,  ZodSchema } from "zod";

type ExtractZODErrors<T> = {
  [K in keyof T]?: string;
};

function getZodErrors<T extends ZodSchema>(schema: T, data: unknown): ExtractZODErrors<z.infer<T>> | null {
  const result = schema.safeParse(data);
  if (result.success) return null;

  const formattedErrors = result.error.format();
  const errorMessages: Record<string, string> = {};

  Object.keys(formattedErrors).forEach((key) => {
    if (key !== "_errors") {
      const errorArray = formattedErrors[key as keyof typeof formattedErrors] as unknown as { _errors: string[] };
      if (errorArray?._errors?.length) {
        errorMessages[key] = errorArray._errors[0] ?? "";
      }
    }
  });

  return errorMessages as ExtractZODErrors<z.infer<T>>;
}
const getServerZodErrors = <T extends ZodSchema>(loginSchema: T, data: z.infer<T>): string | null => {
    const result = loginSchema.safeParse(data);
  
    if (result.success) return null;
  
    const errorMessages = Object.values(result.error.flatten().fieldErrors)
      .flat()
      .filter(Boolean);
  
    return errorMessages.length > 0 ? errorMessages.join(', ') : null;
  };

export {getZodErrors,getServerZodErrors}
export type {ExtractZODErrors}
