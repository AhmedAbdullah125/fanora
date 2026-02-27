import { useEffect, useMemo, useRef } from "react";

export function useLocalStorageDraft<T extends object>(
    key: string,
    getValues: () => T,
    setValues: (v: Partial<T>) => void,
    debounceMs = 500
) {
    const timer = useRef<number | null>(null);

    const load = useMemo(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as Partial<T>) : null;
        } catch {
            return null;
        }
    }, [key]);

    useEffect(() => {
        if (load) setValues(load);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function saveNow() {
        try {
            localStorage.setItem(key, JSON.stringify(getValues()));
        } catch { }
    }

    function clear() {
        localStorage.removeItem(key);
    }

    function scheduleSave() {
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(saveNow, debounceMs);
    }

    return { scheduleSave, clear };
}