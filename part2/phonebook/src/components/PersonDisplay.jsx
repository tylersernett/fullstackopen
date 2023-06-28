const PersonDetails = ({ person, handleDelete }) => {
    return (
        <li>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.name, person.id)}>delete</button>
        </li>
    )
}

const PersonDisplay = ({ namesToShow, handleDelete }) => {
    return (
        <>
            <h3>Numbers</h3>
            <ul>
                {namesToShow.map(person => <PersonDetails person={person} key={person.name} handleDelete={handleDelete} />)}
            </ul>
        </>
    )
}

export default PersonDisplay