import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated, getToken } from '../../helpers/auth'



//Bootstrap Components
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
  const [bookingFields, setbookingFields] = useState({
    name_class: 'Cali',
    instructor: 'Lucy',
    cali: '5',
  })
  const [booked, setBooked] = useState(false)

  const { id } = useParams()

  // ! On Mount
  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get('/api/cali/')
        setDate(response.data.filter((item, index, arr) => arr.findIndex(t => t.date_class === item.date_class) === index))
        setBookings(response.data)
        // console.log(response.data[0].name_class)
        // console.log(response.data[0].instructor.instructor_name)
        // console.log(response.data[0].instructor.profile_image)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getDate()
  }, [])

  // This is for handling the calendar
  const handleButtonChange = (date) => {
    // Filter the bookings array to only include bookings for the selected date
    const filteredBookings = bookings.filter((booking) => booking.date_class === date)
    // Update the component state with the filtered bookings
    setFilteredBookings(filteredBookings)
  }


  //This is to handle the button Book
  const handleBookClass = async (booking) => {
    console.log('BOOKING FIELDS ->', bookingFields)
    try {
      await axios.post('/api/booking/', booking,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })

    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  return (
    <main className="container">
      <div className="calendar">
        {date && date.map((item, i) => (
          <div key={i}>
            <Button variant="light" className="button-calendar" onClick={() => handleButtonChange(item.date_class)}>{format(new Date(item.date_class), 'MMMM do yyyy')}</Button>
          </div>
        ))}
      </div>
      <div className="card-container">
        {filteredBookings.length > 0 ?
          filteredBookings.map((booking, i) => {
            const { id, name_class, instructor, studio, time_class } = booking
            return (
              <div key={i} className="card flex-row mb-3">
                <div className="card-image instructor">
                  <img className="link-image" src={instructor.profile_image} alt={instructor.instructor_name} />
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-title">Class: {name_class}</p>
                  <p className="card-text">Instructor: {instructor.instructor_name}</p>
                  <p className="card-text">Studio: {studio}</p>
                  <p className="card-text">Time: {time_class}</p>
                </div>
                {/* check if authenticated. if true, show the button book, otherwise show register */}
                {isAuthenticated() ?
                  <>
                    <div className="button">
                      <Button className="btn btn-dark" onClick={() => {
                        handleBookClass({
                          name_class: name_class,
                          instructor: instructor.instructor_name,
                          cali: id,
                        })
                        // This is not working due to the architecture
                        setBooked(true)
                      }}>
                        Book
                      </Button>
                    </div>
                  </>
                  :
                  <Link to="/register" as={Link} className={location.pathname === '/register' ? 'active' : ''}><Button className="btn btn-dark register-button">Register</Button></Link>
                }
              </div>
            )
          }) :
          <p className="no-booking">No bookings found for this date.</p>
        }
      </div>
    </main>
  )
}
export default Calendar