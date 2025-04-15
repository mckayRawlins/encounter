"use client";

import EncounterModal from "../_components/EncounterModal";
import EncounterCard from "../_components/EncounterCard";
import { useContext, useState } from "react";
import { EncounterContext } from "../context/EncounterProvider";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEncounter, setSelectedEncounter] = useState({});
  const { encounters, setEncounters } = useContext(EncounterContext);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedEncounter({});
  }

  function updateEncounter(id, location, notes) {
    if (!id) return;
    setEncounters(
      encounters.map((encounter) => {
        if (encounter.id === id) {
          return { ...encounter, location, notes };
        }
        return encounter;
      })
    );
  }

  function addEncounter(location, notes) {
    setEncounters([
      ...encounters,
      {
        id: Date.now(),
        location,
        notes,
        monsters: [],
      },
    ]);
  }

  function editEncounter(encounter) {
    setSelectedEncounter(encounter);
    openModal();
  }

  function deleteEncounter(encounterId) {
    setEncounters(
      encounters.filter((encounter) => encounter.id !== encounterId)
    );
  }

  return (
    <div className="grid grid-cols-4 h-dvh relative overflow-auto">
      {encounters?.map((encounter) => (
        <EncounterCard
          key={encounter.id}
          location={encounter.location}
          notes={encounter.notes}
          monsters={encounter.monsters}
          onEdit={() => editEncounter(encounter)}
          onDelete={() => deleteEncounter(encounter.id)}
        />
      ))}
      <button
        onClick={openModal}
        className="absolute bottom-20 right-10 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4
         border-gray-700 hover:border-gray-500 hover:cursor-pointer rounded"
      >
        add new encounter
      </button>
      <EncounterModal
        closeModal={closeModal}
        isOpen={isOpen}
        addNewEncounter={addEncounter}
        updateEncounter={updateEncounter}
        encounter={selectedEncounter}
      />
    </div>
  );
}
