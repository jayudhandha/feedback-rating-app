import { useContext, useState, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"

function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  // we will use useEffect to run only when feedbackEdit changes
  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const [text, setText] = useState("")
  const [rating, setRating] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")

  const handleTextChange = ({ target: { value } }) => {
    if (value === "") {
      setBtnDisabled(true)
      setMessage(null)
    } else if (value !== "" && value.trim().length < 10) {
      setBtnDisabled(true)
      setMessage("Text must be atleast 10 characters")
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating,
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText("")
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How you rate our service?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            type='text'
            onChange={handleTextChange}
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}
export default FeedbackForm
