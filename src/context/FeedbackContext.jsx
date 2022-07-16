import { createContext, useEffect, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id")
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch("/feedback/" + id, {
        method: "DELETE",
      })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
    // Below code for managing feedback in context instead of backend server
    // newFeedback.id = v4()
    // console.log(newFeedback)
    // // feedback.push(newFeedback)
    // // setFeedback(feedback)
    // setFeedback([newFeedback, ...feedback])
  }

  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch("/feedback/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
