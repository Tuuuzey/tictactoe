import { useState } from 'react';

export default function Player({name, symbol}) {
  const [playerName, setPlayerName] = useState(name)
  const [isEditing, setIsEditing] = useState(false);
  
  function handleClick() {
    setIsEditing(editing => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if(isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}></input>;
  }

  return (
    <li className='player'>
      <span>
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}