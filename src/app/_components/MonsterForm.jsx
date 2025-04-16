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
  },
  {
    name: "proficiencies",
    abbr: "",
    type: "text",
    span: 2,
  },
  ,
  {
    name: "strength",
    abbr: "STR",
    type: "number",
  },
  {
    name: "dexterity",
    abbr: "DEX",
    type: "number",
  },
  {
    name: "constitution",
    abbr: "CON",
    type: "number",
  },
  {
    name: "intelligence",
    abbr: "INT",
    type: "number",
  },
  {
    name: "wisdom",
    abbr: "WIS",
    type: "number",
  },
  {
    name: "charisma",
    abbr: "CHA",
    type: "number",
  },
  {
    name: "size",
    abbr: "",
  },
  {
    name: "type",
    abbr: "",
  },
  {
    name: "alignment",
    abbr: "",
  },

  {
    name: "speed",
    abbr: "",
  },
  {
    name: "senses",
    abbr: "",
  },
  { name: "damage_vulnerabilities", abbr: "", type: "text", span: 1 },
  {
    name: "damage_resistances",
    abbr: "",
    type: "text",
    span: 1,
  },
  {
    name: "damage_immunities",
    abbr: "",
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
    name: "languages",
    abbr: "",
    type: "text",
    span: 1,
  },
  {
    name: "action",
    abbr: "",
    type: "text",
    span: 2,
  },
];

export default function MonsterForm({ handleChange, data }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-600 text-white">
      {fields.map((field) => {
        switch (field.type) {
          case "first_index":
            return (
              <div
                className={field.span === 2 ? "col-span-2" : ""}
                key={field.name}
              >
                <TextInput
                  label={
                    field.abbr ? field.abbr : field.name.replace(/_/g, " ")
                  }
                  name={field.name}
                  type="number"
                  value={data[field.name][0].value}
                  onChange={(e) => {
                    handleChange(field.name, [
                      { ...data[field.name][0], value: e.target.value },
                    ]);
                  }}
                />
              </div>
            );
          case "select":
            return (
              <div
                className={field.span === 2 ? "col-span-2" : ""}
                key={field.name}
              >
                <label className="capitalize text-2xl" htmlFor={field.name}>
                  {field.abbr ? field.abbr : field.name.replace(/_/g, " ")}:
                </label>
                <select
                  key={field.name}
                  name={field.name}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select {field.name}</option>
                </select>
              </div>
            );
          default:
            return (
              <div
                className={field.span === 2 ? "col-span-2" : ""}
                key={field.name}
              >
                <TextInput
                  key={field.name}
                  label={
                    field.abbr ? field.abbr : field.name.replace(/_/g, " ")
                  }
                  name={field.name}
                  type={field.type || "text"}
                  value={data[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              </div>
            );
        }
      })}

      {/* <span>
        Speed:{" "}
        <input
          type="text"
          value={
            pageData.speed.fly
              ? `walk ${pageData.speed.walk}, fly ${pageData.speed.fly}`
              : `walk ${pageData.speed.walk}`
          }
          onChange={(e) => handleChange("speed", e.target.value)}
          className="p-2 rounded w-full"
        />
      </span> */}
    </div>
  );
}
