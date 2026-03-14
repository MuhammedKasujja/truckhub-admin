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
import {
  UserCreateSchema,
  UserUpdateSchema,
  UserUpdateSchemaType,
} from "@/features/users/schemas";
import { createUser, updateUser } from "@/features/users/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type UserFormProps = {
  initialData?: Partial<UserUpdateSchemaType>;
};

export function UserForm({ initialData }: UserFormProps) {
  const isEdit = !!initialData;

  const formSchema = isEdit ? UserUpdateSchema : UserCreateSchema;

  const tr = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const promise =
      "id" in values
        ? updateUser(initialData!.id!, values)
        : createUser(values);

    const { isSuccess, error, message } = await promise;
    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(error!.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? tr("edit_user") : tr("new_user")}</CardTitle>
        <CardDescription>{tr("create_user_help")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="p-6 md:p-8"
          onSubmit={form.handleSubmit(handleSubmit, (errors) => {
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
            {!isEdit && (
              <PasswordField
                label={tr("common.form.password")}
                name={"password"}
                control={form.control}
              />
            )}
            <CardFooter>
              <Button type="submit">{tr("common.form.submit")}</Button>
            </CardFooter>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
