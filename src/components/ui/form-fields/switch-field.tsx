import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
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
        <FieldLabel htmlFor={field.name}>
          <Field orientation="horizontal" data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldTitle>{label}</FieldTitle>
              {/* {required && (
                <AsteriskIcon
                  className={cn("text-destructive inline size-2.5 align-top")}
                />
              )} */}
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
              {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
            </FieldContent>
            <Switch
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
            />
          </Field>
        </FieldLabel>
      )}
    />
  );
}
