const PersonDetails = ({ person }) => {
    return (
        <li>{person.name}: {person.number}</li>
    )
}

const PersonDisplay = ({ namesToShow }) => {
    return (
        <>
            <h3>Numbers</h3>
            <ul>
                {namesToShow.map(person => <PersonDetails person={person} key={person.name} />)}
            </ul>
        </>
    )
}

export default PersonDisplay