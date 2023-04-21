import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated, getToken } from '../../helpers/auth'
import { useHistory } from 'react-router-dom'


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
  const [addClass, setAddClass] = useState([])
  const [formFields, setFormFields] = useState({
    name_class: '',
    instructor: '',
    user_id: '',
  })
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

  // This is for handing the calendar
  const handleButtonChange = (date) => {
    // Filter the bookings array to only include bookings for the selected date
    const filteredBookings = bookings.filter((booking) => booking.date_class === date)
    // Update the component state with the filtered bookings
    setFilteredBookings(filteredBookings)
  }


  //This is for booking one class
  useEffect(() => {
    const bookClass = async () => {
      try {
        await axios.post('/api/booking/', addClass,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
        history.push('/booking')
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    if (addClass.length > 0) {
      bookClass()
    }
  }, [addClass])

  const handleBookClass = (e) => {
    e.preventDefault()
    setAddClass({
      ...addClass,
      [e.target.name]: e.target.value,
    })
    console.log(e.target.name)
    console.log(e.target.value)
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
            const { name_class, instructor, studio, time_class } = booking
            return (
              <div key={i} className="card flex-row mb-3">
                <div className="card-image">
                  <img src={instructor.profile_image} alt={instructor.instructor_name} />
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
                      <Button className="btn btn-dark" onClick={handleBookClass}>Book</Button>
                    </div>
                  </>
                  :
                  <Link to="/register" as={Link} className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
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