import { useState } from 'react'

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setName] = useState(name)
  const [isEditing, setisEditing] = useState(false)

  let playerContent = <span className="player-name">{playerName}</span>
  let btnCaption = 'Edit'

  function handleChange(event) {
    setName(event.target.value)
  }

  function changeEdit() {
    setisEditing((editing) => !editing)

    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  if (isEditing) {
    playerContent = (
      <input type="text" required value={playerName} onChange={handleChange} />
    )
    btnCaption = 'Save'
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerContent}
        <span className="player-symbol">{symbol}</span>
        <button onClick={changeEdit}>{btnCaption}</button>
      </span>
    </li>
  )
}
