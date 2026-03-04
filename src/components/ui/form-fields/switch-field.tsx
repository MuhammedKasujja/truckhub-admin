import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { AsteriskIcon } from "lucide-react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

type SwitchFieldProps<T extends FieldValues> = {
  label?: string;
  control: Control<T>;
  name: FieldPath<T>;
  description?: string;
  required?: boolean;
};

export function SwitchField<T extends FieldValues>({
  control,
  name,
  label,
  required = true,
  description,
}: Readonly<SwitchFieldProps<T>>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name}>
              {label}
              {/* {required && (
                <AsteriskIcon
                  className={cn("text-destructive inline size-2.5 align-top")}
                />
              )} */}
            </FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>
          <Switch
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
      )}
    />
  );
}
