import EncounterPage from "./EncounterPage";
import MonsterSelector from "../../_components/MonsterSelector";
import Initiative from "../../_components/Initiative";

async function fetchMonsters() {
  const response = await fetch("https://www.dnd5eapi.co/api/monsters");
  if (!response.ok) {
    throw new Error("failed to fetch monsters");
  }
  const monsterData = await response.json();
  return monsterData.results;
}

export default async function Page() {
  const monsters = await fetchMonsters();

  return (
    <div className="p-5">
      <div className="drop-shadow-md">
        <EncounterPage />
        <div>
          <MonsterSelector monsters={monsters} />
        </div>
      </div>
      <Initiative />
    </div>
  );
}
