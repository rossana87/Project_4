import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getToken } from '../../helpers/auth'

import Button from 'react-bootstrap/Button'

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
        console.log(data.user.username)
        console.log(data.cali_classes)
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
        <h2>Classes Booked</h2>
        <div>
          {profileData.cali_classes.map((caliClass, i) => (
            <div key={i} className="card-body d-flex flex-column">
              <h4 className="card-title">{caliClass.name_class}</h4>
              <p className="card-text">Date: {caliClass.date_class}</p>
              <p className="card-text">Time: {caliClass.time_class}</p>
              <p className="card-text">Duration: {caliClass.duration_class}</p>
              <div>
                <Button className="btn btn-dark">Cancel</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )


}
export default Profile