import { FC } from 'react';
import './style.css';

interface ISelectedItemProps {
  item: string
  onClick?: (item: string) => void
}

const SelectedItem: FC<ISelectedItemProps> = ({ item, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <div className="selected-item">
      {item}
      {onClick && (<div className="close-button" onClick={handleClick}>x</div>)}
    </div>
  )
}

export { SelectedItem };
