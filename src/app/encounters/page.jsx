"use client"

import EncounterModal from "../components/EncounterModal";
import EncounterCard from "../components/EncounterCard";
import { useEffect, useState } from "react";


export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEncounter, setSelectedEncounter] = useState({});
    const [encounters, setEncounters] = useState([
        {
            id: 1,
            location: 'Catacombs',
            notes: 'This place has a lot of bones'
        }
    ])


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setSelectedEncounter({});
    }

    function updateEncounter(id, location, notes) {
        setEncounters(encounters.map(encounter => {
            if (encounter.id === id) {
                return { id, location, notes }
            }
            return encounter;
        }))
    }

    function addEncounter(location, notes) {
        setEncounters([
            ...encounters,
            {
                id: encounters.length + 1,
                location,
                notes
            }
        ])
    }

    function editEncounter(encounter) {
        setSelectedEncounter(encounter);
        openModal();
    }

    useEffect(() => {
        localStorage.setItem('encounter', JSON.stringify(encounters));
    }, [encounters]);

    return (
        <div className="grid grid-cols-4 h-dvh relative overflow-auto">
            {encounters.map(encounter => (
                <EncounterCard key={encounter.id} location={encounter.location} notes={encounter.notes} onEdit={() => editEncounter(encounter)} />
            ))}
            <button onClick={openModal} className="absolute bottom-20 right-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4
         border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded">add new encounter</button>
            <EncounterModal closeModal={closeModal} isOpen={isOpen} addNewEncounter={addEncounter} updateEncounter={updateEncounter} encounter={selectedEncounter} />

        </div>
    )
}