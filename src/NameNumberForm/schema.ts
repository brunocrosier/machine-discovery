import { z } from "zod";

export const formRowsSchema = z.array(z.object({
    name: z.string().nonempty(),
    number: z.string().nonempty().or(z.number())
}))

export const formSchema = z.object({
    rows: formRowsSchema
})

export type FormSchema = z.infer<typeof formSchema>