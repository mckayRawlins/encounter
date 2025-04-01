import Modal from "./Modal";
import { useEffect, useState } from "react";

export default function EncounterModal({ isOpen, closeModal, addNewEncounter, updateEncounter, encounter }) {
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");

    const handleLocationInput = (event) => {
        const { value } = event.target;
        setLocation(value);
    }

    const handleNotesInput = (event) => {
        const { value } = event.target;
        setNotes(value);
    }

    function handleAdd(event) {
        event.preventDefault();
        if (encounter.id) {
            updateEncounter(encounter.id, location, notes);
        } else {
            addNewEncounter(location, notes);
        }
        closeModal();
        setLocation("");
        setNotes("");
    }

    useEffect(() => {
        if (encounter.id) {
            setLocation(encounter.location);
            setNotes(encounter.notes);
        }
    }, [encounter])

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <form onSubmit={handleAdd} className=" flex flex-col">
                <label>Location:</label>
                <input value={location} onChange={handleLocationInput} type="text" placeholder="enter location name" className="border rounded-md p-1.5 mb-3" required />
                <label>Notes:</label>
                <input value={notes} onChange={handleNotesInput} type='text' placeholder="enter encounter notes" className="border rounded-md p-1.5 resize-none" />
                <button type="submit" className="bottom-20 right-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4
         border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded w-fit self-center mt-3">{encounter.id ? 'update' : 'add'}</button>
            </form>
        </Modal>
    )
}