import { Buffer } from 'buffer'
import axios from 'axios'

const tokenName = 'CALI-KULTURE-2022'

export const getPayload = () => {
  const token = localStorage.getItem(tokenName) // get full token from localStorage
  if (!token) return
  const splitToken = token.split('.') // split token into 3 parts
  const payloadString = splitToken[1] // take the middle payload string and save it to a variable
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

export const isAuthenticated = () => {
  const payload = getPayload() // get payload object containing the expiry date under the exp key
  if (!payload) return false // if it's undefined, it doesn't exist and so we return false
  const currentTime = Date.now() / 1000 // current time by using Date.now()
  return currentTime < payload.exp // check if the expiry is bigger than the current timestamp, if it is, it's valid
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

export const getToken = () => {
  return localStorage.getItem(tokenName)
}

export const authenticated = axios.create({
  baseURL: 'api/auth/login/',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
