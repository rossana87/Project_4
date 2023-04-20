import { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

//Bootstrap Components
import Carousel from 'react-bootstrap/Carousel'
import CarouselControl from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'


const Calendar = () => {

  const [date, setDate] = useState()
  const [error, setError] = useState('')

  // ! On Mount
  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get('/api/cali/')
        setDate(response.data.filter((item, index, arr) => arr.findIndex(t => t.date_class === item.date_class) === index))
        //setDate(response.data)
        console.log(response.data)
        console.log(response.data[0].date_class)
      } catch (err) {
        console.log(err)
      }
    }
    getDate()
  }, [])

  return (
    <>
      <main className="calendar-container">
        <Carousel indicators={false}>
          {/* <CarouselControl className="carousel-control-prev-icon show" direction="prev" />
          <CarouselControl className="carousel-control-next-icon show" direction="next" /> */}
          {date && date.map((item, i) => (
            <div key={i} className="d-flex align-items-space-between justify-content-center">
              <Button variant="light">{format(new Date(item.date_class), 'iiii do yyyy')}</Button>
            </div>
          ))}
        </Carousel>
      </main>
    </>
  )
}
export default Calendar