import { useState, useCallback } from 'react';

import { Modal } from './components/Modal';
import { SelectedItem } from './components/SelectedItem';
import './App.css'

function App() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleSelect = useCallback((elems: string[]) => setSelectedItems(elems), []);

  return (
    <div className="main-wrapper">
      {isOpenModal && (
        <Modal
          onClose={() => setIsOpenModal(false)}
          selectedItems={selectedItems}
          onSelect={handleSelect}
        />
      )}
      <p>You currently have {selectedItems.length} selected items</p>
      <div className="selected-item-wrapper">
        {selectedItems.map((item) => (
          <SelectedItem item={item} key={item} />
        ))}
      </div>
      <div className="change-button" onClick={() => setIsOpenModal(true)}>
        Change my choice
      </div>
    </div>
  )
}

export default App
