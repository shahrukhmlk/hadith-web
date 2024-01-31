import { SearchableSelectInputProps, SelectItem } from "./SearchableSelectInput"

function getSampleSelectItems(size: number) {
  const items: SelectItem<string>[] = []
  for (let i = 0; i < size; i++) {
    items.push({
      item: `Item ${i}`,
      label: `Item label ${i}`,
      value: `Item value ${i}`,
    })
  }
  return items
}

const base: SearchableSelectInputProps<string> = {
  items: getSampleSelectItems(10),
}

export const mockSearchableSelectInputProps = {
  base,
}
