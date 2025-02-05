import validator from "validator"

export const validateSignup = (fullName, email, userName, password) => {
  if (!fullName || !email || !userName || !password) {
    return "All fields must be filled"
  }
  if (!validator.isEmail(email)) {
    return "Not a valid email"
  }
  return null
}

export const validateLogin = (email, password) => {
  if (!email || !password) {
    return "All fields must be filled"
  }
  if (!validator.isEmail(email)) {
    return "Not a valid email"
  }
  return null
}

export const validateEvent = (eventData) => {
    const { title, type, ticketPriceNormal, ticketPriceVip } = eventData
  
    if (!title || !type || !ticketPriceNormal || !ticketPriceVip) {
      return "Title, type, and ticket prices are required"
    }
  
    if (!["MOVIE", "CONCERT", "OTHERS"].includes(type)) {
      return "Invalid event type"
    }
  
    return null
  }
  