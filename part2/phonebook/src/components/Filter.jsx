const Filter = ({ filter, setFilter }) => {
    return (
        <>
            filter by name: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </>
    )
}

export default Filter