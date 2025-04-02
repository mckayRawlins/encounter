"use client";

import { useState } from "react";

export default function MonsterSelector({ monsters }) {
  const [selectedMonsterIndex, setSelectedMonsterIndex] = useState("");

  const handleMonsterSelect = (event) => {
    setSelectedMonsterIndex(event.target.value);
  };
  return (
    <>
      <div>
        <label>Select a monster:</label>
        <select onChange={handleMonsterSelect} value={selectedMonsterIndex}>
          <option value="">--Select a monster--</option>
          {monsters.map((monster) => (
            <option key={monster.index} value={monster.index}>
              {monster.name}
            </option>
          ))}
        </select>
      </div>

      {selectedMonsterIndex}
    </>
  );
}
