import {FC, useCallback, useMemo, useState} from 'react';
import './style.css';

import { SelectedItem } from '../SelectedItem';
import { Item } from '../Item';

interface IModalProps {
  onClose: () => void
  selectedItems: string[]
  onSelect: (id: string[]) => void
}

const NO_FILTER = 'no filter';
const items: string[] = Array.from({ length: 300 }, (_, i) => `Item ${i + 1}`);

const Modal: FC<IModalProps> = ({ onClose, onSelect, selectedItems }) => {
  const [search, setSearch] = useState("");
  const [selectedItemsLocal, setSelectedItemsLocal] = useState<string[]>(selectedItems);
  const [filter, setFilter] = useState<string>(NO_FILTER);

  const filteredItems = useMemo(() => {
    const searchedItems = items.filter((id) => id.includes(search));
    if (filter === NO_FILTER) {
      return searchedItems;
    }
    return searchedItems.filter((item) => parseInt(item.split(' ')[1]) < parseInt(filter.split(' ')[1]));
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
  }, [selectedItemsLocal]);

  return (
    <div className="modal">
      <div className="inner-modal">
        <div className="close-icon" onClick={onClose}>x</div>
        <h2 className="title">Select items</h2>
        <div className="settings">
          <input className="settings-item" type="text" placeholder="Search items" onChange={(e) => setSearch(e.target.value)} />
          <select className="settings-item" onChange={(e) => setFilter(e.target.value)}>
            <option>no filter</option>
            <option>&lt; 10</option>
            <option>&lt; 50</option>
            <option>&lt; 100</option>
          </select>
        </div>
        <div className="list-wrapper">
          {filteredItems.map((item) => (
            <Item
              item={item}
              key={item}
              isSelected={selectedItemsLocal.includes(item)}
              isDisabled={selectedItemsLocal.length >= 3 && !selectedItemsLocal.includes(item)}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <div className="selected-item-print">
          <p className="sub-title">Current selected items:</p>
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
