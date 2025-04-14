import TextInput from "./TextInput";

const fields = [
  {
    name: "name",
    abbr: "",
    span: 2,
  },
  {
    name: "size",
    abbr: "",
    span: 2,
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
    name: "armor_class",
    abbr: "",
    type: "first_index",
  },
  {
    name: "hit_points",
    abbr: "",
    type: "number",
  },
  /*  {
    name: "speed",
    abbr: "",
  }, */
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
    name: "proficiencies",
    abbr: "",
    type: "select",
    span: 2,
  },
];

export default function MonsterForm({ handleChange, data }) {
  console.log(data);
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
