"use client";
import { EncounterContext } from "../context/EncounterProvider";
import Modal from "./Modal";
import { useContext, useState } from "react";

export default function Initiative() {
  const { encounter, setEncounter } = useContext(EncounterContext); // Assuming context is used for encounter data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState(
    Array(6).fill({ name: "Player", currentHP: 100, maxHP: 100 })
  );
  const [monsters, setMonsters] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleHPChange = (index, delta) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].currentHP = Math.max(
      0,
      Math.min(
        updatedPlayers[index].maxHP,
        updatedPlayers[index].currentHP + delta
      )
    );
    setPlayers(updatedPlayers);
  };

  const handleAddMonster = (monster) => {
    setMonsters([...monsters, monster]);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Initiative
      </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="p-4 bg-gray-800 text-white rounded">
          <h2 className="text-2xl font-bold mb-4">Initiative Tracker</h2>

          {/* Players Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Players</h3>
            {players.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerChange(index, "name", e.target.value)
                  }
                  className="bg-gray-700 text-white px-2 py-1 rounded w-1/4"
                />
                <div className="flex items-center">
                  <button
                    onClick={() => handleHPChange(index, -1)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={player.currentHP}
                    readOnly
                    className="bg-gray-700 text-white px-2 py-1 rounded mx-2 w-12 text-center"
                  />
                  <button
                    onClick={() => handleHPChange(index, 1)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <span className="ml-4">
                  Max HP:{" "}
                  <input
                    type="number"
                    value={player.maxHP}
                    onChange={(e) =>
                      handlePlayerChange(index, "maxHP", parseInt(e.target.value) || 0)
                    }
                    className="bg-gray-700 text-white px-2 py-1 rounded w-16"
                  />
                </span>
              </div>
            ))}
          </div>

          {/* Monsters Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Monsters</h3>
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Monster Name"
                className="bg-gray-700 text-white px-2 py-1 rounded w-1/2"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleAddMonster({ name: e.target.value.trim() });
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <ul>
              {monsters.map((monster, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span>{monster.name}</span>
                  <button
                    onClick={() =>
                      setMonsters(monsters.filter((_, i) => i !== index))
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={toggleModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}