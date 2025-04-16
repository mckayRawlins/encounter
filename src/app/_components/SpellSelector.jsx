"use client";

import { useState } from "react";
import ApiSelector from "./ApiSelector";

export default function SpellSelector() {
  const [spells, setSpells] = useState([]);

  const handleAddSpell = (spell) => {
    setSpells((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...spell,
      },
    ]);
  };

  const handleRemoveSpell = (id) => {
    setSpells((prev) => prev.filter((spell) => spell.id !== id));
  };
  return (
    <div>
      <div>
        <ApiSelector
          title="Spells"
          list={spells}
          add={handleAddSpell}
          remove={handleRemoveSpell}
          apiResource="spells"
        />
      </div>
    </div>
  );
}
