const truncate = (text, limit) => {
    if (text.length > limit) {
        return text.slice(0, limit) + '...'
    } else {
        return text
    }
}

export default truncate;