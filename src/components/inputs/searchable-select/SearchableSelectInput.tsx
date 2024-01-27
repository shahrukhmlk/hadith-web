"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps, PopoverTriggerProps } from "@radix-ui/react-popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { forwardRef, HTMLAttributes, useState } from "react"

export interface SelectItem<T> {
  label: string
  value: string
  item: T
}

export interface SearchableSelectInputProps<T> extends PopoverTriggerProps {
  items: SelectItem<T>[]
  selectedItem?: SelectItem<T>
  placeHolder?: string
  selectText?: string
  emptyText?: string
  onItemSelect?: (item: SelectItem<T>) => void
  onFilterChange?: (search: string) => void
}

export default function SearchableSelectInput<T>({
  items = [],
  selectedItem,
  placeHolder,
  selectText,
  emptyText,
  onItemSelect,
  onFilterChange,
  ...props
}: SearchableSelectInputProps<T>) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild {...props}>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[200px] justify-between",
            !selectedItem && "text-muted-foreground",
          )}
        >
          {selectedItem
            ? items.find((item) => item.value === selectedItem.value)?.label
            : selectText ?? "Select item"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeHolder ?? "Search..."}
            onValueChange={onFilterChange}
            className="h-9"
          />
          <CommandEmpty>{emptyText ?? "No item found."}</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                value={item.value}
                key={item.label}
                onSelect={() => {
                  if (onItemSelect) {
                    onItemSelect(item)
                  }
                  setOpen(false)
                }}
              >
                {item.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    item.value === selectedItem?.value
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
