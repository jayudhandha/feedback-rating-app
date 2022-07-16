import { useContext } from "react"
import FeedbackContext from "../context/FeedbackContext"
import FeedbackItem from "./FeedbackItem"

function FeedbackList() {
  const { feedback } = useContext(FeedbackContext)

  console.log(feedback)
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback yet!</p>
  }

  return (
    <div className='feedback-list'>
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </div>
  )
}
export default FeedbackList