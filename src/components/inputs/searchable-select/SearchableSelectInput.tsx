"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverTriggerProps } from "@radix-ui/react-popover"
import { useState } from "react"

export interface SelectItem {
  label: string
  value: string
}

export interface SearchableSelectInputProps extends PopoverTriggerProps {
  items: SelectItem[]
  selectedItem?: SelectItem
  placeHolder?: string
  selectText?: string
  emptyText?: string
  name?: string
  isLoading?: boolean
  onItemSelect?: (item: SelectItem) => void
  onFilterChange?: (search: string) => void
}

export default function SearchableSelectInput({
  items = [],
  selectedItem,
  placeHolder = "Search...",
  selectText = "Select item",
  emptyText = "No item found.",
  isLoading = false,
  name = "search",
  onItemSelect,
  onFilterChange,
  ...props
}: SearchableSelectInputProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild {...props}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between",
            !selectedItem && "text-muted-foreground",
          )}
        >
          {selectedItem ? selectedItem.label : selectText}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false} label={name}>
          <CommandInput
            placeholder={placeHolder}
            onValueChange={onFilterChange}
            className="h-9"
          />
          <CommandEmpty>{isLoading ? "Loading..." : emptyText}</CommandEmpty>
          <CommandList>
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
