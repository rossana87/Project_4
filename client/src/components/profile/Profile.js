import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getToken } from '../../helpers/auth'

const Profile = () => {

  const [error, setError] = useState('')
  const [profile, setProfile] = useState({ cali: [] })

  const { userId } = useParams()

  // ! On Mount

















}
export default Profile