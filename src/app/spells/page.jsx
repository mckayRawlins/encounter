import SpellSelector from "../_components/SpellSelector";

export default function Page() {
  return (
    <div
      className="h-[calc(100dvh-50px)] 
    bg-[url('/dnd_logo.png')] bg-no-repeat bg-top overflow-hidden"
    >
      <SpellSelector />
    </div>
  );
}
