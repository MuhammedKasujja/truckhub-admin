import { RequiredLabelIcon } from "@/components/required-label-icon";
import { AutoComplete, AutoCompleteProps } from "@/components/ui/autocomplete";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../field";

interface AutoCompleteFieldProps<
  T,
  F extends FieldValues,
> extends AutoCompleteProps<T> {
  control: Control<F>;
  name: FieldPath<F>;
  description?: string | undefined;
  required: boolean;
}

export function AutoCompleteField<T, F extends FieldValues>({
  fetcher,
  preload,
  filterFn,
  renderOption,
  getOptionValue,
  getDisplayValue,
  notFound,
  loadingSkeleton,
  label,
  placeholder = "Select...",
  value,
  onChange,
  disabled = false,
  className,
  triggerClassName,
  noResultsMessage,
  clearable = true,
  name,
  control,
  description,
  required = true,
}: AutoCompleteFieldProps<T, F>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <RequiredLabelIcon />}
            </FieldLabel>
            <AutoComplete<T>
              className={className}
              triggerClassName={triggerClassName}
              noResultsMessage={noResultsMessage}
              fetcher={fetcher}
              filterFn={filterFn}
              disabled={disabled}
              loadingSkeleton={loadingSkeleton}
              renderOption={renderOption}
              getOptionValue={getOptionValue}
              getDisplayValue={getDisplayValue}
              notFound={notFound}
              label={label}
              placeholder={placeholder}
              value={field.value}
              clearable={clearable}
              preload={preload}
              onChange={async (value) => {
                onChange(value);
                field.onChange(value ? getOptionValue(value) : "");
              }}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
