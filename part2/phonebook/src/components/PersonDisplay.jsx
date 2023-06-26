const PersonDisplay = ({ namesToShow }) => {
    return (
        <>
            <h3>Numbers</h3>
            <ul>
                {namesToShow.map(person => <li key={person.name}>{person.name}: {person.number}</li>)}
            </ul>
        </>
    )
}

export default PersonDisplay