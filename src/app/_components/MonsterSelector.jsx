"use client";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { EncounterContext } from "../context/EncounterProvider";
import MonsterForm from "./MonsterForm";

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


        // Preprocess proficiencies into a string
         const proficienciesString = data.proficiencies
         ? data.proficiencies
     .map(
       (prof) =>
         `${prof.proficiency.name} +${prof.value}` // Format each proficiency
     )
     .join(", ") // Join them with commas
 : "";

 // Preprocess Actions and Legendary Actions into a string
 const actionString = [
  ...(data.actions
    ? data.actions.map((action) => `${action.name}: ${action.desc}`)
    : []), // Format each action
  ...(data.legendary_actions
    ? data.legendary_actions.map(
        (legendaryAction) =>
          `Legendary Actions - ${legendaryAction.name}: ${legendaryAction.desc}`
      )
    : []), // Format each legendary action
  ...(data.reactions
    ? data.reactions.map(
        (reaction) => `Reactions - ${reaction.name}: ${reaction.desc}`
      )
    : []), // Format each reaction
  ...(data.special_abilities
    ? data.special_abilities.map(
        (specialAbility) =>
          `Special Abilities - ${specialAbility.name}: ${specialAbility.desc} ${specialAbility.usage?.times} ${specialAbility.usage?.type}`
      )
    : []), // Format each special ability
].join(", "); // Combine all actions, legendary actions, reactions, and special abilities with commas

const condition_immunitiesString = data.condition_immunities
  ? data.condition_immunities
      .map((immunity) => `${immunity.name}`) // Map each immunity to its name
      .join(", ") // Join them with commas
  : ""; // Default to an empty string if no condition immunities exist

  const speedString = data.speed
  ? Object.entries(data.speed)
      .map(([type, value]) => `${type} ${value}`) // Format each key-value pair
      .join(", ") // Join them with commas
  : ""; // Default to an empty string if no speed data exists

  const sensesString = data.senses
  ? Object.entries(data.senses)
      .map(([type, value]) => `${type.replace(/_/g, " ")} ${String(value).replace(/\./g, "")}`)
      .join(", ") // Format each key-value pair
  : ""; // Default to an empty string if no speed data exists


 

const newMonster = {
 ...data,
 location: pageEncounter.location, // Assign the current encounter's location
 id: Date.now(), // Unique ID for the monster
 index: monsters.length + 1, // Incremental index for display
 proficienciesString, // Add the preprocessed proficiencies string
actionString, // Add the preprocessed actions string
condition_immunitiesString, // Add the preprocessed condition immunities string
speedString, // Add the preprocessed speed string 
sensesString // Add the preprocessed senses string
  
  };
  
  /*     // Remove unnecessary properties from the monster data
    delete newMonster.proficiencies;
    delete newMonster.actions;
    delete newMonster.legendary_actions;
    delete newMonster.reactions;
    delete newMonster.special_abilities;
    delete newMonster.condition_immunities;
    delete newMonster.speed;
    delete newMonster.senses; */
        
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
    <div className="flex">
      <div className="w-1/2">
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Add
        </button>

        {selectedMonsters.length > 0 && (
          <ul>
            {selectedMonsters
              .filter((monster) => monster.location === pageEncounter.location)
              .map((monster) => (
                <li
                  key={monster.id}
                  onClick={() => handleMonsterClick(monster.id)}
                  className="cursor-pointer text-white bg-slate-600 drop-shadow-md p-2 m-3 w-1/3 hover:bg-slate-500"
                >
                  <span>{monster.name}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
      {isEditorOpen && pageData && (
        <div className="flex flex-col items-center">
          <div className="h-[520px] overflow-auto">
            <div className="flex flex-col items-center justify-center">
              <MonsterForm
                handleChange={handleMonsterDataChange}
                data={pageData}
              />
              <div className="mt-4"></div>
            </div>
          </div>
          <div>
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
    </div>
  );
}
