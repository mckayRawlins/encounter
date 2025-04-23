"use client";

import { EncounterContext } from "@/app/context/EncounterProvider";
//import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

export default function EncounterPage() {
  const { encounter } = useParams();
  const { encounters } = useContext(EncounterContext);

  ///console.log("testing", encounters);

  const decodedEncounter = encounter ? decodeURIComponent(encounter) : "";

  const pageEncounter = encounters?.find(
    (e) => e?.location.toLowerCase() === decodedEncounter.toLowerCase()
  );

  console.log("testing on encounter page ", decodedEncounter);

  if (!pageEncounter) return null;

  return (
    <div>
      <h1 className="bg-slate-600 text-white p-3 rounded-t-lg">
        {pageEncounter.location.toUpperCase()}
      </h1>
      <p>
        <span className="font-bold">Notes for {pageEncounter.location}: </span>
        {pageEncounter.notes}
      </p>
    </div>
  );
}
