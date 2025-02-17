"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CheckoutData {
  eventType: "MOVIE" | "CONCERT"
  selectedSeats?: string[]
  normalTickets?: number
  vipTickets?: number
  totalAmount: number
  eventId: string
  ticketPriceNormal?: number
  ticketPriceVip?: number
}

interface CheckoutContextType {
  checkoutData: CheckoutData
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>
  clearCheckoutData: () => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

const STORAGE_KEY = "checkoutData"

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}

const initialCheckoutData: CheckoutData = {
  eventType: "MOVIE",
  totalAmount: 0,
  eventId: "",
  selectedSeats: [],
  normalTickets: 0,
  vipTickets: 0,
  ticketPriceNormal: 0,
  ticketPriceVip: 0,
}

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(STORAGE_KEY)
      return storedData ? JSON.parse(storedData) : initialCheckoutData
    }
    return initialCheckoutData
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutData))
  }, [checkoutData])

  const clearCheckoutData = () => {
    setCheckoutData(initialCheckoutData)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData, clearCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  )
}

