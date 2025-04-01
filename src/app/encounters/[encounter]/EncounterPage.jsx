"use client";

import useLocalStorage from "@/app/hooks/useLocalStorage";
import { useParams } from "next/navigation";

export default function EncounterPage() {
  const { encounter } = useParams();
  const [encounters, setEncounters] = useLocalStorage("encounters", []);

  const decodedEncounter = encounter ? decodeURIComponent(encounter) : "";

  const pageEncounter = encounters?.find(
    (e) => e.location.toLowerCase() === decodedEncounter.toLowerCase()
  );

  if (!pageEncounter) return null;

  return (
    <div className="p-5">
      <h1 className="text-center">{pageEncounter.location.toUpperCase()}</h1>
      <p>
        <span className="font-bold">Notes for {pageEncounter.location}: </span>
        {pageEncounter.notes}
      </p>
    </div>
  );
}
