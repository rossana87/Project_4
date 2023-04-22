import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getToken } from '../../helpers/auth'

import Button from 'react-bootstrap/Button'

const Bookings = () => {

  const [error, setError] = useState('')
  const [bookingData, setBookingData] = useState([])
  // const [deleteIdBooking, setDeleteIdBooking] = useState('')
  const [user, setUser] = useState([])
  const [editedBookings, setEditedBookings] = useState([])

  const { user_id } = useParams()

  // ! On Mount
  useEffect(() => {
    const getBooking = async () => {
      try {
        const { data } = await axios.create({
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .get('/api/booking/')
        setBookingData(data)
        console.log('BOOKING DATA -> ', data)
        console.log('BOOKING ID ->', data[0].id)
        console.log('Cali time ->', data[0].cali.time_class)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getBooking()
  }, [])


  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const updatedBookings = user.filter(bookings => bookings.id !== bookingId)
      setUser(updatedBookings)
      setEditedBookings(updatedBookings)
      console.log('UPDATED BOOKINGS ->', updatedBookings)

    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  return (
    <main className="profile-container">
      <div className="classes-booked">
        <div className="card-container bookings">
          <h2>Classes Booked</h2>
          {bookingData.length > 0 &&
            bookingData.map((bookingId) => {
              const { id, cali, instructor, name_class } = bookingId
              return (
                < div key={id} className="card-body d-flex flex-column">
                  <div className="card-body d-flex flex-column">

                    <h4 className="card-title">{name_class} - {instructor}</h4>
                    <p className="card-text">Date: {cali['date_class']}</p>
                    <p className="card-text">Time: {cali['time_class']}</p>
                    <p className="card-text">Duration: {cali['duration_class']}</p>
                    <div>
                      <Button className="btn btn-dark" onClick={() => handleDelete(bookingId.id)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </main>
  )

}
export default Bookings