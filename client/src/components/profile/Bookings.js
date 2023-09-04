import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getToken } from '../../helpers/auth'

import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const Bookings = () => {
  const [error, setError] = useState('')
  const [bookingData, setBookingData] = useState([])
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
      const updatedBookings = bookingData.filter(booking => booking.id !== bookingId)
      setBookingData(updatedBookings)
      setEditedBookings(updatedBookings)
      console.log('UPDATED BOOKINGS ->', updatedBookings)

    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  return (
    <main className="booking-container">
      <div className="card-container bookings">
        <Image className="cali-top-image" src="https://res.cloudinary.com/dtu5wu4i9/image/upload/v1681843338/Project%204/a7b731_ec92dfa1ba624c5bb0f6c562f027c0fb_mv2_zixaew.webp" alt="Cali-Team" />
        <h2 className="classes-booked">Classes Booked</h2>
        {bookingData.length > 0 &&
          bookingData.map((bookingId) => {
            const { id, cali, instructor, name_class } = bookingId
            return (
              < div key={id} className="card-body d-flex flex-column">
                <div className="card-body-bookings d-flex flex-column">
                  <h5 className="card-title">{name_class} - {instructor}</h5>
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
    </main>
  )

}
export default Bookings