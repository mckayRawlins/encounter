"use client"

import React, { useReducer } from 'react';

function counterReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            return state;
    }
}

export default function Counter() {
    const [count, dispatch] = useReducer(counterReducer, 1);

    const increment = () => {
        dispatch({ type: 'increment' });
    }

    const decrement = () => {
        if (count > 1) {
            dispatch({ type: 'decrement' });
        }
    }


    return (
        <>
            <span>{count}</span>
            <button onClick={increment} className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-.5 px-2 ml-2 border-b-4
             border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded'>+</button>
            <button onClick={decrement} className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-.5 px-3 ml-2 border-b-4
             border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded'>-</button>
        </>
    )
}