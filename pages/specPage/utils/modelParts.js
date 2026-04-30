export function flattenModelParts(parts = [], parent = null) {
    return parts.flatMap((part) => {
        const current = {
            ...part,
            parentId: parent?.id ?? null,
            parentLabel: parent?.label ?? null,
            parentTitle: parent?.title ?? null,
        };

        const children = flattenModelParts(part.children ?? [], current);

        return [current, ...children];
    });
}

export function getModelPartById(parts = [], partId) {
    return flattenModelParts(parts).find((part) => part.id === partId) ?? null;
}