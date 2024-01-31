import { SearchableSelectInputProps, SelectItem } from "./SearchableSelectInput"

function getSampleSelectItems(size: number) {
  const items: SelectItem[] = []
  for (let i = 0; i < size; i++) {
    items.push({
      label: `Item label ${i}`,
      value: `Item value ${i}`,
    })
  }
  return items
}

const base: SearchableSelectInputProps = {
  items: getSampleSelectItems(10),
}

export const mockSearchableSelectInputProps = {
  base,
}
