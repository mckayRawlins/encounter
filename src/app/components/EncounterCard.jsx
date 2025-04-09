import Link from "next/link";

export default function EncounterCard({ location, notes, onEdit, onDelete }) {
  return (
    <>
      <div className="flex flex-col h-fit m-3 bg-white rounded-lg hover:bg-gray-100 hover:cursor-pointer">
        <Link href={`../encounters/${location}`}>
          <div className="bg-amber-300 text-center py-2 rounded-t-lg hover:bg-amber-200">
            {location}
          </div>
        </Link>
        <div
          className="max-w-sm p-6 border border-gray-200 rounded-b-lg shadow-sm
                 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h4>Notes:</h4>
          <p>{notes}</p>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold py-1 px-2 border-b-4
         border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded self-center m-1"
            onClick={onEdit}
          >
            edit
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold py-1 px-2 border-b-4
                     border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded self-center m-1"
            onClick={onDelete}
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
}
