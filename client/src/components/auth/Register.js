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
    password_confirmation: '',
  })

  const [error, setError] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    // console.log('TARGET NAME -> ', e.target.name)
    // console.log('VALUE -> ', e.target.value)
    // console.log('FORMFIELDS ->', formFields.password_confirmation)
    setError('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formFields)
      // Navigate to the login page
      navigate('/login')
    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }
  }

  return (
    <>
      <main className="register-page">
        <Container className="form-wrapper">
          <Row>
            <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
              <h1 className='display-6 text-center'>Register</h1>
              {/* Username */}
              <label htmlFor="username">Username</label>
              <input type="text" name="username" onChange={handleChange} value={formFields.username} />
              {/* First Name */}
              <label htmlFor="first_name">First Name</label>
              <input type="text" name="first_name" onChange={handleChange} value={formFields.first_name} />
              {/* Last Name */}
              <label htmlFor="last_name">Last Name</label>
              <input type="text" name="last_name" onChange={handleChange} value={formFields.last_name} />
              {/* Email */}
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={handleChange} value={formFields.email} />
              {/* Password */}
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={handleChange} value={formFields.password} />
              {/* Password Confirmation */}
              <label htmlFor="passwordConfirmation">Password Confirmation</label>
              <input type="password" name="password_confirmation" onChange={handleChange} value={formFields.password_confirmation} />
              {/* Submit */}
              <button className='btn btn-brown w-100 mb-4'>Sign Up</button>
              {/* Error */}
              {error && <p className='text-danger text-center'>{error}</p>}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )

}
export default Register