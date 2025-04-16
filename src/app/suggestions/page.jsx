export default function SuggestionPage() {
  return (
    <div
      className="flex flex-col justify-center items-center w-full p-5 h-[calc(100dvh-50px)] 
    bg-[url('/dnd_logo.png')] bg-no-repeat bg-top overflow-hidden"
    >
      <h1 className="w-1/2 bg-gray-600 rounded-t-2xl text-white text-center p-3">
        Suggestions
      </h1>
      <div className="w-full flex justify-center">
        <iframe
          src="https://forms.gle/7ENtEJBSMthjB1Ga8"
          height="600px"
          width="50%"
        >
          Loading...
        </iframe>
      </div>
    </div>
  );
}
