import Link from "next/link";

export default function EncounterCard({ location, notes, onEdit, onDelete }) {
  return (
    <div className="flex flex-col h-fit m-3 bg-white rounded-lg">
      <Link href={`../encounters/${location}`}>
        <div className="bg-red-500 text-center py-2 rounded-t-lg hover:bg-red-400">
          {location}
        </div>
      </Link>
      <div
        className="max-w-sm p-6 border border-gray-200 rounded-b-lg shadow-sm
                 dark:bg-gray-800 dark:border-gray-700"
      >
        <h4>Notes:</h4>
        <p>{notes}</p>
        <button
          className="bg-gray-500 hover:bg-gray-400 text-white text-xs font-bold py-1 px-2 border-b-4
         border-gray-700 hover:border-gray-500 hover:cursor-pointer rounded self-center m-1"
          onClick={onEdit}
        >
          edit
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-400 text-white text-xs font-bold py-1 px-2 border-b-4
                     border-gray-700 hover:border-gray-500 hover:cursor-pointer rounded self-center m-1"
          onClick={onDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
}
