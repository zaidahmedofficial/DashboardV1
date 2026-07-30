import { z } from "zod";
import { TransactionType, TransactionStatus } from "@prisma/client";

export const transactionTypeSchema = z.enum(["INCOME", "EXPENSE"]);
export const transactionStatusSchema = z.enum(["PENDING", "PAID", "FAILED"]);

export const transactionSchema = z.object({
  date: z.date({
    required_error: "A date is required",
  }),
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }).positive("Amount must be greater than 0"),
  type: transactionTypeSchema,
  category: z.string().min(1, "Category is required"),
  counterparty: z.string().optional(),
  status: transactionStatusSchema.optional().default("PENDING"),
});

export const transactionUpdateSchema = transactionSchema.partial();

export type TransactionInput = z.infer<typeof transactionSchema>;
export type TransactionUpdateInput = z.infer<typeof transactionUpdateSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type LoginInput = z.infer<typeof loginSchema>;
