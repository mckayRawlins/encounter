"use client"
import React from "react";
import { useLocalStorage } from '@uidotdev/usehooks'
import EncounterModal from "../components/EncounterModal";
import EncounterCard from "../components/EncounterCard";
import { useEffect, useState } from "react";


export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEncounter, setSelectedEncounter] = useState({});
    const [encounters, setEncounters] = useLocalStorage( 'encounters',[
        {
            id: 1,
            location: 'Catacombs',
            notes: 'This place has a lot of bones',
            monsters: [
                { name: 'Skeleton', CR: 1, size: 'Medium', type: 'Undead', speed: '30 ft', Alignment: 'Neutral Evil', AC: 13, HP: 13, 
                 strength: 12, dexterity: 14, constitution: 10, intelligence: 1, wisdom: 13, charisma: 1 , savingThrows: 'Dexterity +2, Wisdom +1', skills: 'Perception +3, Stealth +4', 
                 damageImmunities: 'Poison, Psychic', senses: 'Darkvision 60 ft, Passive Perception 13', languages: 'Undead', description: 'Actions Shortsword. Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: (1d6 + 2) piercing damage. Shortbow. Ranged Weapon Attack: +4 to hit, reach 80/320 ft., one target. Hit: (1d6 + 2) piercing damage.'
                 },
            ]
        }
    ])


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setSelectedEncounter({});
    }

    function updateEncounter(id, location, notes, monsters) {
        if (!id) return;
        setEncounters(encounters.map(encounter => {
            if (encounter.id === id) {
                return { id, location, notes, monsters }
            }
            return encounter;
        }))
    }

    function addEncounter(location, notes, monsters) {
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