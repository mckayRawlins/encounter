"use client";

import { useState } from "react";

export default function MonsterSelector({ monsters }) {
  const [selectedMonsterIndex, setSelectedMonsterIndex] = useState("");
  const [selectedMonsters, setSelectedMonsters] = useState([]);

  const handleMonsterSelect = (event) => {
    setSelectedMonsterIndex(event.target.value);
  };

  const handleAddMonster = () => {
    if (!selectedMonsterIndex) return;

    const monsterToAdd = monsters.find(
      (monster) => monster.index === selectedMonsterIndex
    );

    if (
      !selectedMonsters.some(
        (monster) => monster.index === selectedMonsterIndex
      )
    ) {
      setSelectedMonsters([...selectedMonsters, monsterToAdd]);

      setSelectedMonsterIndex("");

      console.log(monsterToAdd.index);
    }
  };

  return (
    <>
      <div>
        <label>Monsters: </label>
        <select onChange={handleMonsterSelect} value={selectedMonsterIndex}>
          <option value="">--Select a monster--</option>
          {monsters.map((monster) => (
            <option key={monster.index} value={monster.index}>
              {monster.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddMonster}
          disabled={!selectedMonsterIndex}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          Add
        </button>
      </div>

      {selectedMonsters.length > 0 && (
        <ul>
          {selectedMonsters.map((monster) => (
            <li key={monster.index}>
              <span>{monster.name}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
