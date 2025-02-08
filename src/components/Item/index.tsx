import { FC, memo } from 'react';
import './style.css';

interface IItemProps {
  item: string
  isSelected: boolean
  isDisabled: boolean
  onSelect: (id: string) => void
}

const Item: FC<IItemProps> = memo(({ item, isSelected, isDisabled, onSelect }) => {
  return (
    <label className={`container ${isDisabled ? 'disabled' : ''}`}>
      {item}
      <input type="checkbox" checked={isSelected} disabled={isDisabled} onChange={() => onSelect(item)} />
      <span className="checkmark" />
    </label>
  )
})

export { Item };
