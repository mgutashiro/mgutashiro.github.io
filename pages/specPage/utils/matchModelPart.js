import { flattenModelParts } from './modelParts';

function normalizeName(value = '') {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

function getAliases(part) {
    return [
        part.id,
        part.label,
        part.title,
        ...(part.objectNames ?? []),
    ]
        .filter(Boolean)
        .map(normalizeName);
}

export function matchModelPartFromObject(object, parts = []) {
    if (!object) return null;

    const objectNames = [];
    let current = object;

    while (current) {
        if (current.name) objectNames.push(current.name);
        current = current.parent;
    }

    const normalizedObjectNames = objectNames.map(normalizeName);

    const flatParts = flattenModelParts(parts);

    // Prefer more specific names first.
    const sortedParts = [...flatParts].sort((a, b) => {
        const longestA = Math.max(...getAliases(a).map((name) => name.length));
        const longestB = Math.max(...getAliases(b).map((name) => name.length));
        return longestB - longestA;
    });

    return (
        sortedParts.find((part) => {
            const aliases = getAliases(part);

            return aliases.some((alias) =>
                normalizedObjectNames.some((name) => name.includes(alias))
            );
        }) ?? null
    );
}