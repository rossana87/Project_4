# SEI Project 4: Cali-Kulture

## Overview
The last project of the Software Engineering immersive course at General Assembly London was a full-stack solo project built in Python Django API and Django REST framework to serve data from a Postgres database in the back-end and consuming via a front-end built in React.js.

## Brief
* Choose to work solo or in a team
* Build a full-stack application by making a backend and front-end
* Use a Python Django API using Django REST Framework to serve the data from a Postgres database
* Consume the API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Be deployed online so it's publicly accessible

## Deployment
<a href="https://cali-kulture.herokuapp.com/ ">Cali-Kulture</a>

## Timeframe

This was a solo project and the timeframe was 1.5 weeks.

## Technologies used:
**Planning:**

* Excalidraw
* Trello

**Front-end:**

* HTML5
* CSS
* SASS
* JavaScript (ES6)
* React.js
* Axios
* Bootstrap
* Google Fonts

**Back-end:**

* Python
* Django
* Django REST Framework
* PostgreSQL
* TablePlus
* JSONWebToken
* Insomnia
* Git (branching) & GitHub
* Heroku


## Installation

* Clone or download the repo
* `pipenv` to install Python packages
* Enter the project shell `pipenv shell`
* `python manage.py loaddata jwt_auth/seeds.json` to load the user from the database.
* `python manage.py loaddata instructor/seeds.json` to load the instructors from the database.
* `python manage.py loaddata booking/seeds.json` to load the bookings from the database.
* `python manage.py loaddata cali/seeds.json` to load the cali classes from the database
* `cd client` to go to the frontend directory
* `npm install` to install all the front-end dependencies
* Run the following command to run the serve in the front-end  `npm run start`
* Go back to the main directory with `cd ..` or split the terminal at the bottom and run `python manage.py runserver` to run the server in the back-end

## Planning

One of my main hobbies is Calisthenics and as we were all going solo for the last project I decided to build a Calisthenics booking app, named Cali-Kulture, which is the real name of the community that I belong to. Our last project had to be a full-stack app built in Python Django API and Django REST framework to serve data from a Postgres database in the back-end and consuming via a front-end built in React.js.

The wireframe was created in Excalidraw and the main plan was to have a landing page with a navigation bar that included the Cali-Kulture log on the left hand side and classes, login and registration on the right handside.
I am a big fan of minimalistic websites, for this reason I decided to make the home page very simple, which included a banner of my instructors, a header and a description of what Calisthenics is.
From the navbar, the user is able to find classes of the day through the calendar, under the tab classes, and book them only if they are registered. Classes can also be cancelled from here and from the booking page as well.
There is an about page that will explain how Calisthenics was born and at the bottom I would like to include their instagram with a React package.

Below the wireframe with the Homepage, Classes and About Page. I have to say that I got quite creative here.

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683805440/Project%204/project-4-readme-google-docs-2_k5vw1a.png)

While below there is the Profile, Login and Register page.

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683805440/Project%204/project-4-readme-google-docs-2_k5vw1a.png)

However, before creating the wireframe, I created the different relationships in a diagram. This shows the Cali model, which are the classes and here we have all the information related to one class. This has a one to many relationship with the booking as one Cali class can have many bookings. 

The Instructor model has only the name of the instructor and the profile picture and this schema has a one to many relationship with the Cali model because one instructor can do many classes. 

Then, the User model has a one to many relationship with the booking model because one user can make many bookings and same for the Booking model.

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683805449/Project%204/project-4-readme-google-docs-3_mht8xj.png)

In Trello I kept track of what I was doing:

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683805454/Project%204/project-4-readme-google-docs-4_rf2imh.png)

## Approach

### Back-end

#### Models

Soon after setting up the project, I created the models per app and registered them in the admin.py file of the app itself. As per the diagram above, I had a total of four models.

1. Cali Class Model

```python 
class Cali(models.Model):
    name_class = models.CharField(max_length=100)
    studio = models.CharField()
    time_class = models.TimeField()
    date_class = models.DateField()
    duration_class = models.CharField()
    instructor = models.ForeignKey(
        # the first positional argument in a FK field type is "to", syntax: appname.ModelClassName
        'instructor.Instructor',
        on_delete=models.CASCADE,
        # this field names the field on which all instructors will be populated on a reverse lookup
        related_name='cali'
    )
    owner = models.ForeignKey(
        # the first positional argument in a FK field type is "to", syntax: appname.ModelClassName
        'users.User',
        on_delete=models.CASCADE,
        # this field names the field on which all users will be populated on a reverse lookup
        related_name='cali'
    )

    def __str__(self):
        return f"{self.name_class} ({self.instructor}) ({self.time_class} {self.date_class})"
```

* The Cali model consisted of the name of the class, studio, time of the class, date of the class and duration of the class.
* Instructor was a foreign key field on this model that established a many to one relationship with the Instructor model app. It also specifies the related name as cali. This field allows each class to have one instructor associated with it and if an instructor is deleted, all related classes will also be deleted due to `on_delete=models.CASCADE`.
* I created this owner field as well, which has a many to one relationship with the model User, to find out if the user `is_staff`, however I decided not to use it during my project.

2. Instructor Class Model

```python 
class Instructor(models.Model):
    instructor_name = models.CharField(max_length=100)
    profile_image = models.URLField(validators=[URLValidator()])

    def __str__(self):
        return self.instructor_name
```

* This model is very simple and it has only the name of the instructor and a profile image of the instructor. 

* `__str__(self)` is a method that provides a string representation of the instructor object. This is useful for displaying the instructor’s name in the admin interface.

3. Booking Class Model

```python 
class Booking(models.Model):
    name_class = models.CharField(max_length=50)
    instructor = models.CharField(max_length=50)
    cali = models.ForeignKey(
        # the first positional argument in a FK field type is "to", syntax: appname.ModelClassName
        'cali.Cali',
        on_delete=models.CASCADE,
        # this field names the field on which all bookings will be populated on a reverse lookup
        related_name='booking'
    )
    user_id = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='booking'
    )

    def __str__(self):
        return self.name_class
  ```

* The Booking Model shows the classes booked and consists of the name of the class and the instructor. `cali` and `user_id` are both a foreign key field and established a many to one relationship. `cali` with the Cali model and `user_id` with the User model.

4. User Class Model

```python 
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True, error_messages={
        'unique': "This email has already been registered."})
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
```

* This model is a custom user model named User that extends Django's built-in `AbstractUser` model. The User model has the following fields: email that I specified `unique=True`. This disables users to register with the same email and when it happens prompts the error message shown. First name, last name and `is_staff`. The latter one by default has the value of false, meaning that regular users are not considered staff members. However, on the admin interface this field can be used to grant permission to staff members.

#### JWT Authentication

```python 
class JWTAuthentication(BaseAuthentication):

    # override default authentication by defining an authenticate method
    def authenticate(self, request):
        # 1. Check headers are present, return None if not
        if not request.headers:
            return None

        auth_header = request.headers.get('Authorization')
        # 2. Check Authorization header is on the request
        if not auth_header:
            return None
        # 3. Make sure the Authorization header is a Bearer token
        if not auth_header.startswith('Bearer'):
            return None
        # 4. If Bearer, remove the Bearer part of the string leaving just the token
        token = auth_header.replace('Bearer ', '')
        try:
            # 5. Decode the plain token
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            # 6. Query the user model using the sub if the token is valid
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidSignatureError as e:
            print(e.__class__.__name__)
            print(e)
            return None
        except User.DoesNotExist as e:
            print(e.__class__.__name__)
            print(e)
            return None

        # 7. If the user is found, pass it back with the token as part of the two-tuple
        return (user, token)
```

After creating the models, I proceeded with the authentication, which is really important. The above block of code checks if the person making the request provided the necessary token and if it is valid. If everything is successful, it finds the corresponding user and it returns their information along with the token, which will allow them to access the app. 

#### Serializers

After creating the models,  I created the serializers for all of them. These serializers play a crucial role in facilitating communication between Django and our PostgreSQL database. Their primary purpose is to handle data conversion.
In the database the data is stored in encrypted files, which can be challenging to read. Therefore, it is essential to present the data in a clear format for users accessing the API.
I opted to display the data in JSON format. When the data is submitted to the database, the serializer converts it into the appropriate format for storage. Similarly, when the data is retrieved from the database, the serializer deserializes it, transforming it back into JSON format for ease of use.
The serializers perform validation on the data before storing it into the database, ensuring that it meets the specified criteria and constraints.
By employing serializers, I enable efficient data conversion, clarity in data presentation, and adherence to defined data requirements during the interaction between Django and our PostgreSQL database.

1. Cali Serializer

```python 
class CaliSerializer(ModelSerializer):
    # This will include a Meta subclass that specifies the model we're querying and the fields we want to serialize/deserialize
    class Meta:
        # this is the model to query when making requests
        model = Cali
        # __all__ allows us to include all fields rather than specifying them individually.
        # You can use a list or tuple of names of fields as strings if you want to be specific
        fields = '__all__'
```

* The Cali serializer is a serializer class that is responsible for serializing and deserializing instances of the Cali model. This serializer class is used to specify how data should be converted when communicating with the API. The ModelSerializer method automatically generates the fields in the model we pass through. For this reason, I decided to include all of them.

2. User Serializer

```python
class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        # print('VALIDATE DATA -> ', data)
        # 1. remove password from data, and save a to a variable, later this will be hashed and added back to data
        password = data.pop('password')
        # 2. remove password_confirmation from data, we'll use this to validate against password but we won't add it back on
        password_confirmation = data.pop('password_confirmation')
        # 3. Validate password against password_confirmation, if they don't match, invalidate the request, otherwise move on
        if password != password_confirmation:
            raise serializers.ValidationError(
                {'password_confirmation': 'Does not match password'})
        # 4. OPTIONAL: Password strength validation
        # password_validation.validate_password(password)
        # 5. Hash the plain text password, adding it back onto the data dictionary to be run through default validation
        data['password'] = hashers.make_password(password)
        # print('DATA AFTER CUSTOM VALIDATION ->', data)
        return data

    # Meta with selected fields
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                  'password', 'password_confirmation')

```

* The User serializer is designed to handle the serialization and deserialization of a user data, including custom validation and password hashing. There is an option for strengthening the password as well, which I commented out for all the testing that I was doing, but it is a good option to have.
* Then, I hashed the password using Django's in-built make_password function, and stored it back on the data object. This will become the serializer.data property and will ultimately get stored in the database.
* Finally the User Model will get back with the following fields (id, username, email, first name, last name, password and password confirmation).

In addition to the Serializers, when there is a relationship between the models, such a foreign key in my case, I can populate related fields to include the related model’s data in the serialization process. This allows me to retrieve and display information from related models in a nested form and provide more comprehensive data.

3. Populated Cali Serializer

```python
class PopulatedCaliSerializer(CaliSerializer):
    instructor = InstructorSerializer()
```

By including the instructor field in the PupulatedCaliSerializer, as I mentioned, I will obtain a more comprehensive and nested representation of the Cali model. 

The example below from Insomnia, represents the Instructor model, which has been populated in the Cali model:

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683805807/Project%204/project-4-readme-google-docs-13_mc9yb5.png)

#### Views

With the capability to store and retrieve data effectively, my focus shifted towards determining how my API would present the information to users. To achieve this, I integrated the Django REST framework, which allowed me to create views for rendering our backend data and enabling CRUD functionality, such as create, delete and update.

At this point, I had to decide what requests users could make. Due to the decision that I made at the beginning, users would be able to make a GET request on the classes endpoint, but they would not be able to book and delete a class, unless registered. To do so, I only had to grant permission to the registered users. 

The Django REST framework is highly robust and provides built-in permissions that can be easily incorporated into any view by passing them as a list or tuple to the `permission_classes` property. 
* In `AllCaliClassView`, I am using a GET method to retrieve all classes that are available in the database. I granted permission to `IsAuthenticatedOrReadOnly`. This means that it first checks if the user making the request is authenticated, for instance, if they have provided valid authentication credentials (such as the token) with their request. Authenticated users are granted permission to perform any method on the view. While, `OrReadOnly` are the users that are still granted read-only permissions. Therefore, they are able to make a GET request to retrieve the data, but they are restricted on the other functionality.

```python
class AllCaliClassView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # Endpoint ''/api/cali/'
    @exceptions
    def get(self, request):
        # print('GET /api/cali/ endpoint hit')
        cali = Cali.objects.all()
        serialized_cali = PopulatedCaliSerializer(cali, many=True)
        return Response(serialized_cali.data)
```

* `BookedClassesView` provides access to authenticated users only because I used `IsAuthenticated`. In the first scenario, with the GET method I am able to get all bookings from all users. While with the POST request, in the front-end the authenticated user will be able to book a class.

```python
class BookedClassesView(APIView):
    permission_classes = (IsAuthenticated,)

    # Endpoint ''/api/booking/'
    @exceptions
    def get(self, request):
        booking = Booking.objects.all()
        serializer_booking = PopulatedBookingSerializer(booking, many=True)
        return Response(serializer_booking.data)

    # Book a class
    @exceptions
    def post(self, request):
        booked_class = BookingSerializer(
            data={**request.data, 'user_id': request.user.id})
        booked_class.is_valid(raise_exception=True)
        booked_class.save()
        return Response(booked_class.data, status=status.HTTP_202_ACCEPTED)
```

* Finally, under `BookedClassDetailView`, I created the DELETE request and this will be used when the user cannot attend a Cali class and would like to delete it.

```python
class BookedClassDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    # Endpoint '/api/booking/pk/'
    # Get single booking
    @exceptions
    def get(self, request, pk):
        booked_class = Booking.objects.get(pk=pk)
        serializer_booking = BookingSerializer(booked_class)
        return Response(serializer_booking.data)

    # Delete single booking
    @exceptions
    def delete(self, request, pk):
        booked_class = Booking.objects.get(pk=pk)
        booked_class.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

#### Views for the User

* Register View

```python
class RegisterView(APIView):
    # Register Route
    # Endpoint: api/auth/register/
    @exceptions
    def post(self, request):
        # print('REQUEST DATA -> ', request.data)
        user_to_add = UserSerializer(data=request.data)
        print('REQUEST DATA -> ', request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response(user_to_add.data, status.HTTP_201_CREATED)
```

A POST request is needed if a user would like to register and the endpoint for this route is `api/auth/register/`. The data that is passed through this endpoint must be valid against the UserSerializer before being saved into the database and will return a response indicating a successful creation.

* Login View

```python 
class LoginView(APIView):
    # Login Route
    # Endpoint: api/auth/login/
    @exceptions
    def post(self, request):
        # print(request.data)
        email = request.data['email']
        password = request.data['password']
        user_to_login = User.objects.get(email=email)
        # If the user is found, we want to check the password matches the hash we have in our database
        if not user_to_login.check_password(password):
            print('PASSWORDS DONT MATCH')
            raise PermissionDenied('Unauthorized')

        # At this point the user is validated, so we can send the token back
        dt = datetime.now() + timedelta(days=7)

        token = jwt.encode(
            {'sub':  user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256')
        print('TOKEN ->', token)
        return Response({'message': f"Welcome back, {user_to_login.username}", 'token': token})
 ```
 
After registration, the user will be able to login and have access to the views in the app. This function checks if the user has already registered by checking if the email is within the database. If this is passed, the POST request will also check the password. Once this is all passed, the user is validated and a JSONWebToken will be given, which is stored into the localStorage through the front-end and passes the `isAuthenticated` permission.

* Profile View

```python 
class ProfileView(APIView):
    permission_classes = (IsAuthenticated, )
    # With this function, I am getting all the classes that one user has booked
    @exceptions
    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        bookings = Booking.objects.filter(user_id=user.id)
        cali_classes = [booking.cali for booking in bookings]
        serialized_user = PopulatedUserSerializer(user)
        serialized_cali_classes = CaliSerializer(cali_classes, many=True)
        data = {
            'user': serialized_user.data,
            'cali_classes': serialized_cali_classes.data
        }
        return Response(data)
```

All registered users have their own profile, where all their booked classes would be stored and a GET method is used. It identifies the user who made the request by the id and once the user has been identified, the function looks for all the booking associated with that user and returns the user’s information and the types of classes they have booked.

#### URLs

Now I am able to view and make the desired requests for each endpoint and every app has a folder called `url.py` where I wrote them:

```python 
urlpatterns = [
    # path for this is /api/booking/
    path('', BookedClassesView.as_view()),
    path('<int:pk>/', BookedClassDetailView.as_view())
]
```
```python
urlpatterns = [
    # path for this is /api/cali/
    path('', AllCaliClassView.as_view()),
    # path for this is /api/cali/pk/
    path('<int:pk>/', CaliClassDetailView.as_view())
]
```
```python
urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('profile/<int:pk>/', ProfileDetailView.as_view())
]
```

In addition, in project folder I wrote the following urls in order to access each app:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/cali/', include('cali.urls')),
    path('api/booking/', include('booking.urls')),
    path('api/instructor/', include('instructor.urls')),
    path('api/auth/', include('users.urls'))
]
```
To access them in the front-end, to retrieve data, I only need to use the URLs from above, such as `/api/auth/login/`

### Front-end

#### Create all routes

Once I started working on the front-end, I created all the components, imported them in `App.js` and created all the routes. Organisation is my first priority.

```js
// Components
import Home from './components/Home'
import Classes from './components/cali/Classes'
import PageNavbar from './components/common/PageNavbar'
import PageNotFound from './components/common/PageNotFound'
import Bookings from './components/profile/Bookings'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
```
```js
const App = () => {
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* The below route is rendered if nothing else matches */}
          {/* This is best used on a 404 page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```

#### Page Nav Bar

According to my wireframe, I created the navigation bar. As per code below, I used quite a lot of ternaries, where I am checking if the user is authenticated. If it is, instead of showing Register and Login, it will show Bookings and Logout on the Nav Bar.

```js
return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand to="/" as={Link} className='logo'><img src={Logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav>
            <Nav.Link to="/" as={Link} className={location.pathname === '/' ? 'active' : ''}>Home</Nav.Link>
            <Nav.Link to="/classes" as={Link} className={location.pathname === '/classes' ? 'active' : ''}>Classes</Nav.Link>
            {/* check if authenticated. if true, show logout and profile, otherwise show login and register links */}
            {isAuthenticated() ?
              <>
                <Nav.Link to="/booking" as={Link} className={location.pathname === '/booking' ? 'active' : ''}>Bookings</Nav.Link>
                <span className='nav-link' onClick={handleLogOut}>Logout</span>
              </>
              :
              <>
                <Nav.Link to="/register" as={Link} className={location.pathname === '/register' ? 'active' : ''}>Register</Nav.Link>
                <Nav.Link to="/login" as={Link} className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
```

#### Authentication 

This component is very important for when I will be moving to the Login component. This code helps manage the auth in my app, making sure that the user is authenticated and that the token will be stored in the localStorage and will be created during the API request `api/auth/login/`.

```js
const tokenName = 'CALI-KULTURE-2022'

export const getPayload = () => {
  const token = localStorage.getItem(tokenName) // get full token from localStorage
  if (!token) return
  const splitToken = token.split('.') // split token into 3 parts
  const payloadString = splitToken[1] // take the middle payload string and save it to a variable
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

export const isAuthenticated = () => {
  const payload = getPayload() // get payload object containing the expiry date under the exp key
  if (!payload) return false // if it's undefined, it doesn't exist and so we return false
  const currentTime = Date.now() / 1000 // current time by using Date.now()
  return currentTime < payload.exp // check if the expiry is bigger than the current timestamp, if it is, it's valid
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

export const getToken = () => {
  return localStorage.getItem(tokenName)
}

export const authenticated = axios.create({
  baseURL: 'api/auth/login/',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
```

#### Register

If the user would like to book a cali class they will need to register to the app. 

```js
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
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
```

* In the `useState`, which is like a memory that can remember and hold values, I defined the form fields with the empty values for the username, first name, last name, email, password and password confirmation. These values are the current input values entered by the user when registering.
* The `handleChange` function is called every time there is a change in any of the form fields.
* While the `handleSubmit` function is called when the form is submitted and `e.preventDefault()` prevents the behaviour of the form, which is to refresh the page.
* Then inside the function `handleSubmit`, it sends a POST request to the server to register the user using the data from the form fields. If the request is successful, it navigates the user to the login page to complete the login process. 

#### Login

* The Login is very similar to the register component, but the values in the form fields under useState are slightly different. Inside the function `handleSubmit`, it sends a POST request to the server and if this is successful, the extracted token is then stored in the localStorage. This is like a small storage area in the browser where data can be saved and accessed later. After storing the toke, the user will be navigated to the homepage.

```js
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
```

#### Calendar

In this section, I spent almost a day because I wasn't sure if I wanted to use a react datepicker,  a bootstrap slider or just some buttons. I tried all of them and in the end I didn’t like the datepicker because it was a monthly calendar and I was looking for a weekly calendar. The slider didn’t make much sense because I had to fetch data from the back-end and the database had only 1 week of data. Therefore, I decided to create some buttons for one week. The only drawback of this choice is that the user will be able to see only this week. 


```js
useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get('/api/cali/')
        setDate(response.data.filter((item, index, arr) => arr.findIndex(t => t.date_class === item.date_class) === index))
        setBookings(response.data)
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
```

* Inside the useEffect hook, there is a function called getDate. This function is declared as an asynchronous function and makes a GET request to the `/api/cali/` endpoint. `setDate` is used to update the component's state with a filtered array of unique `date_class` values from the API response, while `setBookings` is used to update the component's state with the unfiltered `response.data` array.
* Then, I created a function for handling the calendar. This filters the bookings and includes only the bookings for the selected dates and updates the component state with the filtered bookings.

#### Cards

```js
 <div className="card-container">
        {filteredBookings.length > 0 ?
          filteredBookings.map((booking, i) => {
            const { id, name_class, instructor, studio, time_class } = booking
            return (
              <div key={i} className="card flex-row mb-3">
                <div className="card-image">
                  <img className="profile-image" src={instructor.profile_image} alt={instructor.instructor_name} />
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-title">Class: {name_class}</p>
                  <p className="card-text">Instructor: {instructor.instructor_name}</p>
                  <p className="card-text">Studio: {studio}</p>
                  <p className="card-text">Time: {time_class}</p>
                </div>
```

* The above code creates the different classes happening in one day. It checks if there are any classes to display. If there are, thanks to the method map, it goes through each class and creates a card for it. Each card shows some details of the class, such as the profile image of the instructor, the class name, the instructor’s name, the studio where the class takes place and the class time.

#### Book button on the cards

```js
//This is to handle to button Book
  const handleBookClass = async (booking) => {
    console.log('BOOKING FIELDS ->', bookingFields)
    try {
      await axios.post('/api/booking/', booking,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
      // setIsBooked(true)
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }
```
```js
<div className="button">
                      <Button className="btn btn-dark" onClick={() => handleBookClass({
                        name_class,
                        instructor: instructor.instructor_name,
                        cali: id,
                      })}>Book</Button>
                    </div>
```

* On every card, there is the button Book. This can be used only from the registered user. If they aren’t registered, they will not be able to see this button.
* The first function makes a POST request to the server and checks that the user is authorised.
* In the return, when the button is clicked, it triggers the `onClick` event and calls the `handleBookClass` function. The latter is called with an object as an argument. This object contains the details needed to book the class.

### Challenges

#### Profile

One of the main challenges has been the Profile page. It was very close to the deadline of the project when I created this page. I made a GET request to the profile API and until that point everything was good. I was able to manipulate the data and every user had a profile page. Only when I inserted the button Cancel, I realised that there was an issue in the architecture of the back-end. However, it was too late to change the models now. 

Most likely the problem is in the `PopulatedUserSerializer`. Due to the `cali_classes`, I was not able to cancel the classes from the user’s profile.

```python
class PopulatedUserSerializer(ModelSerializer):
    cali_classes = BookingSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'cali_classes')
```

However, time was against me and I had to find a solution. In the back-end, under booking, I created a function for deleting the classes and one for getting all the bookings. (These are explained in the back-end section).
Instead, I made a GET request to the booking API. To see this page the user has to be registered and it needs to have an authorization.

```js
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
```

Finally, I was able to see the bookings. I created another function which is responsible for deleting a booking.
The function below makes a DELETE request to the server with the specified booking ID. If it is successful, it updates the component’s state; otherwise it will show an error.

```js
const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/api/booking/${bookingId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const updatedBookings = bookingData.filter(booking => booking.id !== bookingId)
      setBookingData(updatedBookings)
      setEditedBookings(updatedBookings)

    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }
```

### Wins

* This has been the first full-stack solo project and at the beginning I was very sceptical, but step by step I made it. I am quite happy with the final result and the design of my application and it is 90% responsive too, which was another big challenge for me.

### Key Learnings

* The importance of designing the models and the fields correctly was a great lesson learnt. Creating the correct relationships between the models is very important too. By ensuring these are correct, it will make accessing and making requests to the API.
* When creating the functions in the back-end, it is very important to test as much as possible. Thanks to testing, I was able to find a solution to my problem.
* Changing the models on the back-end and then using commands `python manage.py makemigrations` and `python manage.py migrate`. It was causing errors. The only way to sort it was to dump data and reseed it again.

### Bugs

* Even if the Profile/Bookings page is working, it saves all the bookings from all the users. Probably, I will need to filter by ID in the front-end or fix the architecture of the back-end.

### Future Improvements

* In the classes page, below the Book button, I would like to add another button for cancelling the classes. In this way the user can cancel straight away from here.
* On the classes page, after the user has booked, change ‘book’ to ‘booked’ and disable the button.
* Create a bigger database, in order to have more a slider or a weekly calendar instead.
* Implement the About page that I was not able to create due to time constraint. 
* At the moment, I don’t have a lot of instructors; however, if I had a big database, I would have liked to filter by instructors as well.

### Final Project
Homepage:

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683812563/Project%204/project-4-readme-google-docs-0_dned2i.png)


Login:

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683812567/Project%204/project-4-readme-google-docs-1_f634tc.png)


Register:

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683812570/Project%204/project-4-readme-google-docs-2_xgsqxp.png)


Classes Page:

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683813158/Project%204/Screenshot_2023-05-11_at_14.51.36_nkanji.png)


Profile / Bookings page:

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683813158/Project%204/Screenshot_2023-05-11_at_14.51.22_er6ak7.png)













