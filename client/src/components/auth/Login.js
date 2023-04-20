import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = () => {

  // ! Location variables
  const navigate = useNavigate()

  // ! State
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
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
      const { data } = await axios.post('/api/auth/login/', formFields)
      // console.log(data)
      localStorage.setItem('CALI-KULTURE-2022', data.token)
      // Navigate to the classes page
      navigate('/')
    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }
  }

  return (
    <main className="login-page">
      <Container className="form-wrapper-login">
        <Row>
          <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
            <h1 className='display-6 text-center'>Login</h1>
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} value={formFields.email} />
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} value={formFields.password} />
            {/* Submit */}
            <button className='btn btn-brown w-100 mb-4'>Login</button>
            {/* Error */}
            {error && <p className='text-danger text-center'>{error}</p>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}
export default Login