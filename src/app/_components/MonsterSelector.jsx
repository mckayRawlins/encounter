"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { EncounterContext } from "../context/EncounterProvider";

export default function MonsterSelector({ monsters }) {
  const [selectedMonsterIndex, setSelectedMonsterIndex] = useState("");
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const { encounter } = useParams();
  const { encounters } = useContext(EncounterContext);
  const decodedEncounter = encounter ? decodeURIComponent(encounter) : "";
  const pageEncounter = encounters?.find(
    (e) => e.location.toLowerCase() === decodedEncounter.toLowerCase()
  );

  // Load saved monsters on mount
  useEffect(() => {
    const stored = localStorage.getItem("monsters");
    if (stored) {
      const parsed = JSON.parse(stored);
      const monsterList = Object.values(parsed);
      setSelectedMonsters(monsterList);
    }
  }, []);

  const handleMonsterSelect = (event) => {
    setSelectedMonsterIndex(event.target.value);
  };

  const handleAddMonster = async () => {
    if (!selectedMonsterIndex) return;

    if (
      !selectedMonsters.some(
        (monster) => monster.index === selectedMonsterIndex
      )
    ) {
      try {
        // Fetch the full monster data from the API
        const response = await fetch(
          `https://www.dnd5eapi.co/api/monsters/${selectedMonsterIndex}`
        );

        const data = await response.json();

        const newMonster = {
          ...data,
          location: pageEncounter.location, //
          id: Date.now(), // Unique ID for the monster
          index: monsters.length + 1, // Incremental index for display
        };

        const updatedMonsters = [...selectedMonsters, newMonster];
        setSelectedMonsters(updatedMonsters);

        // Save all monsters to local storage as a single object
        const current = JSON.parse(localStorage.getItem("monsters") || "{}");
        current[newMonster.id] = newMonster;
        localStorage.setItem("monsters", JSON.stringify(current));

        setSelectedMonsterIndex("");
      } catch (error) {
        console.error("Error fetching monster data:", error);
      }
    }
  };

  const handleMonsterClick = (monsterId) => {
    const savedMonster = selectedMonsters.find(
      (monster) => monster.id === monsterId
    );
    if (savedMonster) {
      setPageData(savedMonster);
      setIsEditorOpen(true);
    }
  };

  const handleMonsterDataChange = (field, value) => {
    setPageData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveMonsterData = () => {
    if (pageData) {
      const current = JSON.parse(localStorage.getItem("monsters") || "{}");
      current[pageData.id] = pageData;
      localStorage.setItem("monsters", JSON.stringify(current));
      setSelectedMonsters(Object.values(current));
      setIsEditorOpen(false);
      setPageData(null);
    }
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setPageData(null);
  };

  return (
    <>
      <label>Monsters: </label>
      <div>
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
          {selectedMonsters
            .filter((monster) => monster.location === pageEncounter.location)
            .map((monster) => (
              <li
                key={monster.id}
                onClick={() => handleMonsterClick(monster.id)}
                className="cursor-pointer text-white bg-slate-600 drop-shadow-md p-2 m-3 w-1/5 hover:bg-slate-500"
              >
                <span>{monster.name}</span>
              </li>
            ))}
        </ul>
      )}

      {isEditorOpen && pageData && (
        <div>
          <div>
            <h2>
              <input
                type="text"
                value={pageData.name || ""}
                onChange={(e) =>
                  handleMonsterDataChange("name", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </h2>
            <p>
              Size:{" "}
              <input
                type="text"
                value={pageData.size || ""}
                onChange={(e) =>
                  handleMonsterDataChange("size", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </p>
            <p>
              Type:{" "}
              <input
                type="text"
                value={pageData.type || ""}
                onChange={(e) =>
                  handleMonsterDataChange("type", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </p>
            <p>
              Alignment :{" "}
              <input
                type="text"
                value={pageData.alignment || ""}
                onChange={(e) =>
                  handleMonsterDataChange("alignment", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </p>
            <p>
              Armor Class :{" "}
              <input
                type="text"
                value={pageData.armor_class[0].value || ""}
                onChange={(e) =>
                  handleMonsterDataChange("armor_class", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </p>
            <p>
              Hit Points :{" "}
              <input
                type="text"
                value={pageData.hit_points || ""}
                onChange={(e) =>
                  handleMonsterDataChange("hit_points", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </p>
            <p>
  Speed:{" "}
  <input
    type="text"
    value={
      pageData.speed.fly
        ? `walk ${pageData.speed.walk}, fly ${pageData.speed.fly}`
        : `walk ${pageData.speed.walk}`
    }
    onChange={(e) =>
      handleMonsterDataChange("speed", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>
<p>
  STR:{" "}
  <input
    type="text"
    value={
      pageData.strength || ""
    }
    onChange={(e) =>
      handleMonsterDataChange("strength", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>
<p>
  DEX:{" "}
  <input
    type="text"
    value={pageData.dexterity || ""}
    onChange={(e) =>
      handleMonsterDataChange("dexterity", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>

<p>
  CON:{" "}
  <input
    type="text"
    value={pageData.constitution || ""}
    onChange={(e) =>
      handleMonsterDataChange("constitution", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>

<p>
  INT:{" "}
  <input
    type="text"
    value={pageData.intelligence || ""}
    onChange={(e) =>
      handleMonsterDataChange("intelligence", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>

<p>
  WIS:{" "}
  <input
    type="text"
    value={pageData.wisdom || ""}
    onChange={(e) =>
      handleMonsterDataChange("wisdom", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>

<p>
  CHA:{" "}
  <input
    type="text"
    value={pageData.charisma || ""}
    onChange={(e) =>
      handleMonsterDataChange("charisma", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>
<p>
  Profiency:{" "}
  <input
    type="text"
    value={pageData.proficiencies || ""}
    onChange={(e) =>
      handleMonsterDataChange("charisma", e.target.value)
    }
    className="border p-2 rounded w-full"
  />
</p>
            
            <button
              onClick={saveMonsterData}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={closeEditor}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
