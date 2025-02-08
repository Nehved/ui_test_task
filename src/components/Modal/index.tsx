import { FC, useCallback, useMemo, useState } from 'react';
import './style.css';

import { SelectedItem } from '../SelectedItem';
import { Item } from '../Item';

interface IModalProps {
  onClose: () => void
  selectedItems: string[]
  onSelect: (id: string[]) => void
}

const filters = [
  {
    value: 0,
    label: 'no filter',
  },
  {
    value: 10,
    label: '< 10',
  },
  {
    value: 50,
    label: '< 50',
  },
  {
    value: 100,
    label: '< 100',
  },
]
const items: string[] = Array.from({ length: 300 }, (_, i) => `Item ${i + 1}`);

const Modal: FC<IModalProps> = ({ onClose, onSelect, selectedItems }) => {
  const [search, setSearch] = useState("");
  const [selectedItemsLocal, setSelectedItemsLocal] = useState<string[]>(selectedItems);
  const [filter, setFilter] = useState<string>('0');

  const filteredItems = useMemo(() => {
    const searchedItems = items.filter((id) =>
      id.toLowerCase().includes(search.toLowerCase())
    );
    if (filter === '0') {
      return searchedItems;
    }
    return searchedItems.filter((id) => parseInt(id.split(' ')[1]) < parseInt(filter));
  }, [search, filter]);

  const handleSelect = useCallback((id: string) => {
    setSelectedItemsLocal((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return Array.from(newSet);
    });
  }, []);

  const onSave = useCallback(() => {
    onSelect(selectedItemsLocal);
    onClose();
  }, [selectedItemsLocal, onClose, onSelect]);

  return (
    <div className="modal">
      <div className="inner-modal">
        <div className="close-icon" onClick={onClose}>x</div>
        <h2 className="title">Select items</h2>
        <div className="settings">
          <input className="settings-item" type="text" placeholder="Search items" onChange={(e) => setSearch(e.target.value)} />
          <select className="settings-item" onChange={(e) => setFilter(e.target.value)}>
            {filters.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="list-wrapper">
          {filteredItems.length ? filteredItems.map((item) => {
            const isSelected = selectedItemsLocal.includes(item);
            return (
              <Item
                item={item}
                key={item}
                isSelected={isSelected}
                isDisabled={selectedItemsLocal.length >= 3 && !isSelected}
                onSelect={handleSelect}
              />
            )
          }) : <span>Nothing found</span>}
        </div>
        <div className="selected-item-print">
          <p className="sub-title">Current selected {selectedItemsLocal.length === 1 ? 'item' : 'items'}:</p>
          <div className={"selected-item-wrapper"}>
            {selectedItemsLocal.length > 0 ? selectedItemsLocal.map((elem) => (
              <SelectedItem item={elem} onClick={handleSelect} key={elem} />
            )) : 'None'}
          </div>
        </div>
        <div className="footer">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  )
}

export { Modal };
