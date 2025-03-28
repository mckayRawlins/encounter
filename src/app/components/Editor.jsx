import Counter from './Counter'
export default function Editor() {
    return (
        <div className="side-editor flex flex-col border h-dvh w-[20%] p-3">
            <h1>Edit encounter</h1>
            <p>Location:</p>
            <p>Monsters:</p>
            <ul>
                <li>monster <Counter /></li>
                <li>monster <Counter /></li>
                <li>monster <Counter /></li>
                <li>monster <Counter /></li>
            </ul>
        </div>
    )
}