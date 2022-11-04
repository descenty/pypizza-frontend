export const ruDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ru", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}