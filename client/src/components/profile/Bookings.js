// import axios from 'axios'
// import { useParams, Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { getToken } from '../../helpers/auth'

// import Button from 'react-bootstrap/Button'

const Bookings = () => {

  //   const [error, setError] = useState('')
  //   const [bookingData, setBookingData] = useState([])
  //   const [deleteIdBooking, setDeleteIdBooking] = useState('')
  //   const [userClasses, setUserClasses] = useState([])
  //   const [editedClasses, setEditedClasses] = useState([])

  //   const { user_id } = useParams()

  //   // ! On Mount
  //   useEffect(() => {
  //     const getBooking = async () => {
  //       try {
  //         const { data } = await axios.create({
  //           headers: {
  //             Authorization: `Bearer ${getToken()}`,
  //           },
  //         })
  //           .get('/api/booking/')
  //         setBookingData(data)
  //         console.log('PROFILE DATA -> ', data)

  //       } catch (err) {
  //         console.log(err)
  //         setError(err.message)
  //       }
  //     }
  //     getBooking()
  //   }, [])

  //   // const handleDelete = async (classId) => {
  //   //   try {
  //   //     await axios.delete(`/api/booking/${classId}`, {
  //   //       headers: {
  //   //         Authorization: `Bearer ${getToken()}`,
  //   //       },
  //   //     })
  //   //     const updatedClasses = userClasses.filter(cali_classes => cali_classes.id !== classId)
  //   //     setUserClasses(updatedClasses)
  //   //     setEditedClasses(updatedClasses)
  //   //     console.log(updatedClasses)
  //   //   } catch (err) {
  //   //     console.log(err)
  //   //     setError(err.message)
  //   //   }
  //   // }



  //   //return (
  //   // <main className="profile-container">
  //   //   <div className="classes-booked">
  //   //     <h2>Classes Booked</h2>
  //   //     <div>
  //   //       {bookingData.cali_classes.map((caliClass, i) => (
  //   //         <div key={i} className="card-body d-flex flex-column">
  //   //           <h4 className="card-title">{caliClass.name_class}</h4>
  //   //           <p className="card-text">Date: {caliClass.date_class}</p>
  //   //           <p className="card-text">Time: {caliClass.time_class}</p>
  //   //           <p className="card-text">Duration: {caliClass.duration_class}</p>
  //   //           <div>
  //   //             <Button className="btn btn-dark" onClick={() => handleDelete(caliClass.id)}>Cancel</Button>
  //   //           </div>
  //   //         </div>
  //   //       ))}
  //   //     </div>
  //   //   </div>
  //   // </main>
  //   //)
}
export default Bookings