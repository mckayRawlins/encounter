import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    // State to store the value
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                // Get from local storage by key
                const item = window.localStorage.getItem(key);
                // Parse stored json or if none return initialValue
                const parsedValue = item ? JSON.parse(item) : initialValue;
                setValue(parsedValue);
            } catch (error) {
                // If error also return initialValue
                console.error(`Error reading localStorage key “${key}”:`, error);
                //setValue(initialValue);
            }
        }
    }, []); // Initialize from localStorage when key or initialValue changes (on mount and if they change)

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        console.log('value', value)
        if (typeof window !== 'undefined') {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                // Save state
                setStoredValue(valueToStore);
                // Save to local storage
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.error(`Error setting localStorage key “${key}”:`, error);
            }
        } else {
            // If not in a browser environment (e.g., server-side), just update the state
            if (value instanceof Function) {
                setStoredValue(prev => value(prev));
            } else {
                setStoredValue(value);
            }
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;