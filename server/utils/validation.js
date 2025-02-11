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
    console.log(eventData,eventData.title,type,ticketPriceNormal,ticketPriceVip)
  
    if (!title || !type || !ticketPriceNormal) {
      return "Title, type, and ticket prices are required"
    }
  
    if (!["MOVIE", "CONCERT", "OTHERS"].includes(type)) {
      return "Invalid event type"
    }
  
    return null
  }
  
  export const validateBooking = (clientId, eventId, seats, price) => {
    if (!clientId || !eventId || !seats || !price) {
      return "All fields must be filled"
    }
    if (!Array.isArray(seats) || seats.length === 0) {
      return "Seats must be a non-empty array"
    }
    if (!validator.isUUID(clientId) || !validator.isUUID(eventId)) {
      return "Invalid client or event ID"
    }
    if (!validator.isFloat(price.toString()) || price <= 0) {
      return "Invalid price"
    }
    return null
  }