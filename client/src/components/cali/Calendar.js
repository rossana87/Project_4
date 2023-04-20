import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'


//Bootstrap Components
import Carousel from 'react-bootstrap/Carousel'
import CarouselControl from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const Calendar = () => {

  const [date, setDate] = useState()
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [error, setError] = useState('')

  // ! On Mount
  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get('/api/cali/')
        setDate(response.data.filter((item, index, arr) => arr.findIndex(t => t.date_class === item.date_class) === index))
        setBookings(response.data)
        console.log(response.data[0].name_class)
        // console.log(response.data[0].instructor.instructor_name)
        // console.log(response.data[0].instructor.profile_image)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getDate()
  }, [])

  const handleButtonChange = (date) => {
    // Filter the bookings array to only include bookings for the selected date
    const filteredBookings = bookings.filter((booking) => booking.date_class === date)
    // Update the component state with the filtered bookings
    setFilteredBookings(filteredBookings)
  }


  return (
    <main className="container">
      <div className="calendar">
        {date && date.map((item, i) => (
          <div key={i}>
            <Button variant="light" onClick={() => handleButtonChange(item.date_class)}>{format(new Date(item.date_class), 'iiii do yyyy')}</Button>
          </div>
        ))}
      </div>
      <div>
        {filteredBookings.length > 0 ?
          filteredBookings.map((booking, i) => {
            const { nameClass, instructor, studio, timeClass } = booking
            return (
              <div key={i}>
                <h5>Name Class:{nameClass}</h5>
                <p>Instructor: {instructor.instructor_name}</p>
                <p>Studio: {studio}</p>
                <p>Time: {timeClass}</p>
                <div>
                  <img src={instructor.profile_image} alt={instructor.instructor_name} />
                </div>
              </div>
            )
          }) :
          <p>No bookings found for selected date.</p>
        }
      </div>
    </main>
  )
}
export default Calendar