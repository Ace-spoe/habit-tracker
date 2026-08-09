
const HabitDetail = ({ habit , onClose }) => {

  return (
    <div >
      <p>HabitDetails</p>
      <p>
        <span>{habit.frequency}</span>
        <span>{habit.streak}</span>
        <span>{habit.completedDates.map(( date , index) => <span key = {index}>{new Date(date).toDateString()}</span>)}</span>
      </p>
      <button onClick={onClose}>close</button>
    </div>
  )
}

export default HabitDetail