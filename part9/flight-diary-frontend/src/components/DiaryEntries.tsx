import { Entry } from '../types';

const DiaryEntries = ({ entries }: { entries: Entry[] }) => {
  return (
    <>
      <h2>Diary Entries</h2>
      {
        entries && entries.map(entry =>
          <p key={entry.id}>
            <b>{entry.date}</b>
            <br />
            visibility: {entry.visibility}
            <br />
            weather: {entry.weather}
          </p>
        )
      }
    </>
  )
}

export default DiaryEntries