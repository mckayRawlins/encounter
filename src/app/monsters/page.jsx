import Editor from '../components/Editor'

export default function Page() {
    return (
        <main className="flex">
            <Editor />
            <div className="grid grid-cols-4 h-dvh w-dvw relative overflow-auto">
                <div className="flex flex-col h-fit m-3 border bg-white border-amber-500 rounded-t-lg">
                    <div className="bg-amber-300 text-center py-2 rounded-t-lg">Catacombs</div>
                    <div className="p-2">
                        <h4>Description:</h4>
                        <p>this place has lots of bones.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}