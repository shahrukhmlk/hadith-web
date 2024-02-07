"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  CaretSortIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
} from "@radix-ui/react-icons"
import { PopoverTriggerProps } from "@radix-ui/react-popover"
import clsx from "clsx"
import { CommandInput } from "cmdk"
import { Plus } from "lucide-react"
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
  filterValue: string
  onItemSelect?: (item: SelectItem) => void
  onFilterChange?: (search: string) => void
  onClickCreateNew?: (text: string) => void
}

export default function SearchableSelectInput({
  items = [],
  selectedItem,
  placeHolder = "Search...",
  selectText = "Select item",
  emptyText = "No item found.",
  isLoading = false,
  name = "search",
  filterValue,
  onItemSelect,
  onFilterChange,
  onClickCreateNew,
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
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder={placeHolder}
              value={filterValue}
              onValueChange={onFilterChange}
              name={name}
              className={cn(
                "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              )}
            />
            <div className="ml-2 h-4 w-4 shrink-0">
              {isLoading ? (
                <ReloadIcon
                  className={clsx("h-4 w-4 animate-spin opacity-50")}
                />
              ) : onClickCreateNew ? (
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="h-5 w-5"
                  onClick={() => onClickCreateNew(filterValue)}
                >
                  <Plus className="h-4 w-4 opacity-50" />
                </Button>
              ) : null}
            </div>
          </div>
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {items.map((item) => (
              <CommandItem
                value={item.value}
                key={item.value}
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
