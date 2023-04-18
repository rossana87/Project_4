import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Register = () => {

  // ! Location variables
  const navigate = useNavigate()

  // ! State
  const [formFields, setFormFields] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [error, setError] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('api/auth/register/', formFields)
      // // Navigate to the login page
      // navigate('/login')
    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }
  }

  return (
    <>
      <div className="register-page">

        hello world


      </div>
    </>
  )

}
export default Register