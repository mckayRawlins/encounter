"use client";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { EncounterContext } from "../context/EncounterProvider";
import MonsterForm from "./MonsterForm";

export default function MonsterSelector({ monsters }) {
  const [selectedMonsterIndex, setSelectedMonsterIndex] = useState("");

  const [pageData, setPageData] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const { encounter } = useParams();
  const { encounters, setEncounters } = useContext(EncounterContext);
  const decodedEncounter = encounter ? decodeURIComponent(encounter) : "";

  const pageEncounter = encounters?.find(
    (e) => e.location.toLowerCase() === decodedEncounter.toLowerCase()
  );

  /*   // Load saved monsters on mount
  useEffect(() => {
    const stored = localStorage.getItem("monsters");
    if (stored) {
      const parsed = JSON.parse(stored);
      const monsterList = Object.values(parsed);
      setSelectedMonsters(monsterList);
    }
  }, []); */

  const handleMonsterSelect = (event) => {
    setSelectedMonsterIndex(event.target.value);
  };

  const handleAddMonster = async () => {
    if (!selectedMonsterIndex) return;

    try {
      // Fetch the full monster data from the API
      const response = await fetch(
        `https://www.dnd5eapi.co/api/monsters/${selectedMonsterIndex}`
      );

      const data = await response.json();

      // Preprocess proficiencies into a string
      const proficienciesString = data.proficiencies
      ? data.proficiencies
          .map((prof) =>
            `${prof.proficiency.name
              .replace("Saving Throw: ", "") // Remove "Saving Throw:"
              .replace("Skill: ", "")} +${prof.value}` // Remove "Skill:"
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
            .map(
              ([type, value]) =>
                `${type.replace(/_/g, " ")} ${String(value).replace(/\./g, "")}`
            )
            .join(", ") // Format each key-value pair
        : ""; // Default to an empty string if no speed data exists

      /*     // Remove unnecessary properties from the monster data
    delete newMonster.proficiencies;
    delete newMonster.actions;
    delete newMonster.legendary_actions;
    delete newMonster.reactions;
    delete newMonster.special_abilities;
    delete newMonster.condition_immunities;
    delete newMonster.speed;
    delete newMonster.senses; */

      const newMonster = {
        ...data,
        id: Date.now(), // Unique ID for the monster
        proficiencies: proficienciesString, // Add the preprocessed proficiencies string
        action: actionString, // Add the preprocessed actions string
        condition_immunities: condition_immunitiesString, // Add the preprocessed condition immunities string
        speed: speedString, // Add the preprocessed speed string
        senses: sensesString, // Add the preprocessed senses string
      };

      setEncounters((prev) =>
        prev.map((encounter) => {
          console.log("testing from setEncounters: ", encounter);
          if (encounter.location === pageEncounter.location) {
            return {
              ...encounter,
              monsters: [...encounter.monsters, newMonster],
            };
          }
          return encounter;
        })
      );

      setSelectedMonsterIndex("");
    } catch (error) {
      console.error("Error fetching monster data:", error);
    }
  };

  const handleMonsterClick = (monster) => {
    setPageData(monster);
    setIsEditorOpen(true);
  };

  const handleMonsterDataChange = (field, value) => {
    setPageData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteMonster = (monsterId) => {
    console.log("delete", monsterId);
    setEncounters((prev) => {
      return prev.map((encounter) => {
        if (encounter.location === pageEncounter.location) {
          return {
            ...encounter,
            monsters: encounter.monsters.filter(
              (monster) => monster.id !== monsterId
            ),
          };
        }
        return encounter;
      });
    });

    if (pageData && pageData.id === monsterId) {
      setIsEditorOpen(false);
      setPageData(null);
    }
  };

  const saveMonsterData = () => {
    if (pageData) {
      setEncounters((prev) =>
        prev.map((encounter) => {
          if (encounter.location === pageEncounter.location) {
            return {
              ...encounter,
              monsters: encounter.monsters.map((monster) => {
                if (monster.id === pageData.id) {
                  return { ...monster, ...pageData };
                }
              }),
            };
          }
        })
      );
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
          className="bg-gray-600 text-white px-4 py-2 ml-3 rounded hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add
        </button>

        {pageEncounter?.monsters.length > 0 && (
          <ul>
            {pageEncounter.monsters.map((monster) => (
              <li
                key={monster.id}
                className="flex justify-between text-white bg-slate-600 drop-shadow-md p-3 m-3 w-1/3 rounded-md"
              >
                <span
                  onClick={() => handleMonsterClick(monster)}
                  className="cursor-pointer hover:bg-slate-500 rounded-md"
                >
                  {monster.name}
                </span>
                <button
                  onClick={() => handleDeleteMonster(monster.id)}
                  className="rounded-full bg-slate-500 px-2 hover:cursor-pointer"
                >
                  &times;
                </button>
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
              className="bg-green-500 text-white px-4 py-2 rounded hover:cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={closeEditor}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
