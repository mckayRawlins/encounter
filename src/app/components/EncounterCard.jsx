import Link from "next/link";

export default function EncounterCard({ location, notes, onEdit }) {
    return (
        <Link href={`../encounters/${location}`}>
            <div className="flex flex-col h-fit m-3 bg-white rounded-lg  hover:bg-gray-100 hover:cursor-pointer">
                <div className="bg-amber-300 text-center py-2 rounded-t-lg">{location}</div>
                <div className="block max-w-sm p-6 border border-gray-200 rounded-b-lg shadow-sm
                 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h4>Notes:</h4>
                    <p>{notes}</p>
                </div>
                <button onClick={onEdit}>edit</button>
            </div>
        </Link>
    )
}