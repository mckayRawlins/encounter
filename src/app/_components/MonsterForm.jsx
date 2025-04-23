import TextInput from "./TextInput";

const fields = [
  {
    name: "name",
    abbr: "",
    span: 2,
  },
  {
    name: "hit_points",
    abbr: "",
    type: "number",
    span: 2,
  },
  {
    name: "armor_class",
    abbr: "",
    span: 2,
    type: "first_index",
  }
  ,
  {
    name: "strength",
    abbr: "STR",
    type: "number",
    span: 1
  },
  {
    name: "dexterity",
    abbr: "DEX",
    type: "number",
    span: 1
  },
  {
    name: "constitution",
    abbr: "CON",
    type: "number",
    span: 1
  },
  {
    name: "intelligence",
    abbr: "INT",
    type: "number",
    span: 1
  },
  {
    name: "wisdom",
    abbr: "WIS",
    type: "number",
    span: 1
  },
  {
    name: "charisma",
    abbr: "CHA",
    type: "number",
    span: 1
  },
  {
    name: "proficiencies",
    abbr: "",
    type: "text",
    span: 3,
  },
  {
    name: "speed",
    abbr: "",
    span: 3,
  },
  {
    name: "senses",
    abbr: "",
    span: 3
  },

  {
    name: "languages",
    abbr: "",
    type: "text",
    span: 3,
  },
  {
    name: "size",
    abbr: "",
    span: 1
  },
  {
    name: "type",
    abbr: "",
    span: 1
  },
  
  { name: "damage_vulnerabilities", 
    abbr: "Vulnerabilities", 
    type: "text", 
    span: 1 },
  {
    name: "damage_resistances",
    abbr: "Resistances",
    type: "text",
    span: 1,
  },
  {
    name: "damage_immunities",
    abbr: "Immunities",
    type: "text",
    span: 1,
  },
  {
    name: "condition_immunities",
    abbr: "",
    type: "text",
    span: 1,
  },
  {
    name: "action",
    abbr: "",
    type: "text",
    span: 6,
  },
];

const getColSpan = (span = 1) => {
  const spans = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
  };
  return spans[span] || "col-span-1";
};

export default function MonsterForm({ handleChange, data }) {
  return (
    <div className="grid grid-cols-6 gap-3 p-4 bg-slate-600 text-white">
      {fields.map((field) => (
        <div
          className={getColSpan(field.span)} // Dynamically set the column span
          key={field.name}
        >
          {field.name === "action" ? (
            
            <div>
              <label className="block mb-1 text-sm font-medium">
                {field.abbr ? field.abbr : field.name.replace(/_/g, " ")}
              </label>
              <textarea
                name={field.name}
                value={data[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white resize-none h-32"
              />
            </div>
          ) : (
            // Render the default TextInput for other fields
            <TextInput
              label={field.abbr ? field.abbr : field.name.replace(/_/g, " ")}
              name={field.name}
              type={field.type || "text"}
              value={
                field.type === "first_index"
                  ? data[field.name][0]?.value
                  : data[field.name] || ""
              }
              onChange={(e) => {
                if (field.type === "first_index") {
                  handleChange(field.name, [
                    { ...data[field.name][0], value: e.target.value },
                  ]);
                } else {
                  handleChange(field.name, e.target.value);
                }
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
