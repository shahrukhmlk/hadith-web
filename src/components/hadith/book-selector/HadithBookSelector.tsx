"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IBookWithTranslations } from "@/data/models/book"
import { cn } from "@/lib/utils"
import clsx from "clsx"
import * as React from "react"

export interface HadithBookSelectorProps {
  className?: string
  books: IBookWithTranslations[]
  selectedBook?: IBookWithTranslations
  onBookSelect: (bookID: number) => void
}

const HadithBookSelector = ({
  className,
  books,
  selectedBook,
  onBookSelect,
}: HadithBookSelectorProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={clsx(
              selectedBook ? "" : "text-muted-foreground",
              "w-full justify-between",
            )}
          >
            {selectedBook
              ? selectedBook.books_translations.find(
                  (book) => book.languages_code === "en",
                )?.name
              : "Select book..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command
            filter={(value, search) => {
              const book = books.find((book) => book.id === parseInt(value))
              if (
                book?.books_translations.find((bookT) =>
                  bookT.name.includes(search),
                )
              ) {
                return 1
              } else {
                return 0
              }
            }}
          >
            <CommandInput
              name="book-name"
              placeholder="Search book..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No book found.</CommandEmpty>
              <CommandGroup heading="Available books">
                {books.map((book) => (
                  <CommandItem
                    key={book.id}
                    value={book.id.toString()}
                    onSelect={(currentValue) => {
                      onBookSelect(parseInt(currentValue))
                      setOpen(false)
                    }}
                  >
                    {
                      book.books_translations.find(
                        (book) => book.languages_code === "en",
                      )?.name
                    }
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default HadithBookSelector
