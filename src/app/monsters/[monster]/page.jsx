import Link from "next/link";

export default async function Page({ params }) {
    //fetch data
    return (
        <div>
            <h1>{params.monster}</h1>
        </div>
    )
}