"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  EmailField,
  PasswordField,
  TextField,
} from "@/components/ui/form-fields";
import { useTranslation } from "@/i18n";
import { PassengerCreateSchema } from "@/schemas/passenger";
import { createPassenger } from "@/server/passengers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function PassengerForm() {
  const tr = useTranslation();
  const form = useForm<z.infer<typeof PassengerCreateSchema>>({
    resolver: zodResolver(PassengerCreateSchema),
  });

  async function onSubmit(values: z.infer<typeof PassengerCreateSchema>) {
    const { isSuccess, error } = await createPassenger(values);
    if (isSuccess) {
      toast.success("Passenger created successfully");
    } else {
      toast.error(error!.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Passenger</CardTitle>
        <CardDescription>
          Create new passenger
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="p-6 md:p-8"
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
        >
          <FieldGroup>
            <TextField
              label={tr("common.form.first_name")}
              name={"first_name"}
              control={form.control}
            />
            <TextField
              label={tr("common.form.last_name")}
              name={"last_name"}
              control={form.control}
            />
            <TextField
              label={tr("common.form.phone")}
              name={"phone"}
              control={form.control}
              required={false}
            />
            <EmailField
              label={tr("common.form.email")}
              name={"email"}
              control={form.control}
              placeholder="user@mail.com"
            />
            <PasswordField
              label={tr("common.form.password")}
              name={"password"}
              control={form.control}
            />
            <CardFooter>
              <Button type="submit">
                {tr("common.form.submit")}
              </Button>
            </CardFooter>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
