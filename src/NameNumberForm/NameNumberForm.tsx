import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { formRowsSchema, formSchema, type FormSchema } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon, Trash2, SparklesIcon } from "lucide-react";
import JSONFile from "../../public/default-values.json";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { defaultRows } from "./defaultRows";

export const NameNumberForm = () => {
  const { toast } = useToast();

  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rows: defaultRows,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  const watchedFieldArray = form.watch("rows");

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchedFieldArray[index],
  }));

  function onSubmit() {
    const result = JSON.stringify(controlledFields);

    console.log(result);

    toast({
      title: "Submitted form!",
      description: result,
    });
  }

  const { setValue, clearErrors } = form;

  useEffect(() => {
    const safeParsedJsonFile = formRowsSchema.safeParse(JSONFile);

    clearErrors();

    if (mode === "json-import") {
      if (safeParsedJsonFile.success) {
        setValue("rows", safeParsedJsonFile.data);
      } else {
        toast({
          variant: "destructive",
          title: "Incorrect JSON format",
          description: safeParsedJsonFile.error.message,
        });
      }
    } else {
      setValue("rows", defaultRows);
    }
  }, [mode, setValue, toast, clearErrors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          {controlledFields.map((field, index) => (
            <div key={field.id} className="grid gap-2 grid-cols-12">
              <FormField
                control={form.control}
                name={`rows.${index}.name`}
                render={({ field }) => (
                  <FormItem className="col-span-7">
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`rows.${index}.number`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormControl>
                      <Input placeholder="Number" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                aria-label="Remove row"
                size="sm"
                variant="ghost"
                className="col-span-1 h-10"
                onClick={() => remove(index)}
              >
                <Trash2 size="1rem" color="red" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Button
            type="button"
            className="gap-3"
            onClick={() => {
              append({
                name: "",
                number: "",
              });
            }}
          >
            <PlusIcon /> Add
          </Button>
          <Button variant="ghost" className="gap-3" type="submit">
            <SparklesIcon />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
