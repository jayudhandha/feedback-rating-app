import { useContext, useEffect, useState } from "react"
import FeedbackContext from "../context/FeedbackContext"

function RatingSelect({ select, selectedd }) {
  const [selected, setSelected] = useState(8)
  const { feedbackEdit } = useContext(FeedbackContext)

  // we will use useEffect to run only when feedbackEdit changes
  useEffect(() => {
    if (feedbackEdit.edit) {
      setSelected(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])
  const handleChange = (e) => {
    setSelected(+e.target.value)
    select(+e.target.value)
  }
  return (
    <ul className='rating'>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  )
}
export default RatingSelect
