import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getToken } from '../../helpers/auth'

const Profile = () => {

  const [error, setError] = useState('')
  const [profileData, setProfileData] = useState({ cali_classes: [] })

  const { user_id } = useParams()

  // ! On Mount
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.create({
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .get('/api/auth/profile/')
        setProfileData(data)
        console.log('PROFILE DATA -> ', data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getProfile()
  }, [])





  return (
    <main className="profile-container">
      <div className="classes-booked">

      </div>
      <div></div>
    </main>
  )
}
export default Profile