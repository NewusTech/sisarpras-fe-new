import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CommandItem } from "cmdk";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

type CustomFormSelectSearchProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
};

export default function CustomFormSelectSearch<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  placeholder = "Pilih opsi",
  description,
  options,
  className,
  required = false,
  disabled = false,
  onValueChange,
}: CustomFormSelectSearchProps<T>) {
  const { control, watch } = useFormContext<T>();
  const [open, setOpen] = useState(false);

  const findLabel = () => {
    return options?.find((v) => v.value === watch(name))?.label || "";
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full border border-primary-700 text-black rounded-full justify-between py-[17px] text-sm"
                  )}
                  size={"sm"}
                >
                  {findLabel() || `Pilih ${placeholder}`}
                  <ChevronDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="w-96">
                  <CommandInput
                    placeholder={`Cari ${placeholder}...`}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>
                      Data {placeholder} tidak ditemukan.
                    </CommandEmpty>
                    <CommandGroup>
                      {options?.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={(selectedLabel) => {
                            const selectedOption = options.find(
                              (opt) => opt.label === selectedLabel
                            );
                            if (selectedOption) {
                              field.onChange(selectedOption.value);
                              setOpen(false);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          <span className="flex items-center justify-between">
                            {option.label}
                            {field.value === option.value && (
                              <Check className="ml-2 h-4 w-4" />
                            )}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
