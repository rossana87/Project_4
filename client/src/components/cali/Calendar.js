// import { useState, useEffect } from 'react'
// import {
//   format,
//   subMonths,
//   addMonths,
//   startOfWeek,
//   addDays,
//   isSameDay,
//   lastDayOfWeek,
//   getWeek,
//   addWeeks,
//   subWeeks,
//   parseISO,
//   getWeeksInMonth
// } from 'date-fns'
// import axios from 'axios'

// const Calendar = () => {

//   // ! Location variables
//   // stores the currently selected month.
//   const [currentMonth, setCurrentMonth] = useState(new Date())
//   const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth))
//   const [selectedDate, setSelectedDate] = useState(new Date())
//   // an empty array that will store the events fetched from the backend.
//   const [events, setEvents] = useState([])

//   // ! On Mount
//   useEffect(() => {

//     const getEvents = async () => {
//       try {
//         const month = currentMonth.getMonth() + 1
//         const day = new Date().getDate()
//         const response = await axios.get('api/cali/')
//         console.log(response)
//         console.log(response.data[1].date_class)
//         const dateStr = response.data[1].date_class
//         const dateObj = parseISO(dateStr)
//         console.log(dateObj)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getEvents()
//   }, [])

//   // generate weeks for the current month
//   const weeks = getWeeksInMonth(currentMonth)
//   console.log(weeks)

//   // handle click on a date
//   const handleClick = (date) => {
//     setSelectedDate(date)
//   }

//   return (
//     <>
//       <div className="calendar">
//         <header>
//           <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>Prev</button>
//           <h6>{format(currentMonth, 'MMMM yyyy')}</h6>
//           <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Next</button>
//         </header>
//         <table>
//           <thead>
//             <tr>
//               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//                 <th key={day}>{day}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {weeks.map((week) => (
//               <tr key={week[0]}>
//                 {week.map((dateStr) => {
//                   const date = parseISO(dateStr)
//                   const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
//                   const isSelected = dateStr === format(selectedDate, 'yyyy-MM-dd')
//                   const hasEvent = events.some((event) => event.date_class === dateStr)
//                   return (
//                     <td
//                       key={dateStr}
//                       className={`
//                       ${!isCurrentMonth ? 'calendar__date--other-month' : ''}
//                       ${isSelected ? 'calendar__date--selected' : ''}
//                       ${hasEvent ? 'calendar__date--event' : ''}
//                     `}
//                       onClick={() => handleClick(date)}
//                     >
//                       {date.getDate()}
//                     </td>
//                   )
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }
// export default Calendar