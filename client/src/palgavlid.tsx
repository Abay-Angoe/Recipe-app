import React, { useState } from 'react';
import { StyledAddUsers } from './Add-users';
import '../../index.css';
import DepartmentSelect from './DepartmentSelect';

interface AddUsersProps {
  closeModal: () => void;
}

export const Addusers: React.FC<AddUsersProps> = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [department, setDepartment] = useState<string | number>('');
  const [qualification, setQualification] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
    qualification: '',
    department: '',
    form: '',
  });

  const apiUrl =
    'https://plagiarism-detector-aug-api.amalitech-dev.net/api/lecturer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTQ0MTQwNjAsImV4cCI6MTY5NDUwMDQ2MH0.U60r2u5h8AKLxhSO6zL87RLmUMQHAAurktmDdNrbaOg`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phoneNumber: number,
          departmentId: parseInt(department as string),
          qualification: qualification,
        }),
      });

      if (response.ok) {
        alert('Lecturer added successfully!');
        closeModal();
      } else {
        const data = await response.json();
        alert(data.message);
        handleFormValidation
      }
    } catch (error) {
      console.error('Error adding lecturer:', error);
      alert('An error occurred while adding the lecturer');
    }
  };

  const handleFormValidation = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: {
      name?: string;
      email?: string;
      number?: string;
      qualification?: string;
      department?: string;
    } = {};

    if (!name || name.length < 8) {
      validationErrors.name = 'Name must be at least 8 characters';
    }

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!number) {
      validationErrors.number = 'Number is required';
    } else if (!isValidPhoneNumber(number)) {
      validationErrors.number = 'Invalid phone number format';
    }

    if (!qualification || qualification.length < 8) {
      validationErrors.qualification = 'Qualification must be at least 8 characters';
    }

    if (!department) {
      validationErrors.department = 'Department is required';
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTQ0MTQwNjAsImV4cCI6MTY5NDUwMDQ2MH0.U60r2u5h8AKLxhSO6zL87RLmUMQHAAurktmDdNrbaOg`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.nameExists) {
        validationErrors.name = 'Username is already taken';
      }

      if (data.emailExists) {
        validationErrors.email = 'Email already in use';
      }

      if (data.numberExists) {
        validationErrors.number = 'Number already in use';
      }

      if (data.qualificationExists) {
        validationErrors.qualification = 'Qualification already in use';
      }

      if (data.departmentExists) {
        validationErrors.department = 'Department already in use';
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors({ ...errors, ...validationErrors });
      } else {
        setErrors({
          name: '',
          email: '',
          number: '',
          qualification: '',
          department: '',
          form: '',
        });
        setIsFormSubmitted(true);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const isValidEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  };

  const isValidPhoneNumber = (value: string) => {
   
    const phoneRegex = /^\+?[0-9]{1,}$/;
    return phoneRegex.test(value);
  };

  return (
    <>
      <StyledAddUsers>
        <section id="modal">
          <div className="add-users">
            <h1>Add Lecturer</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-input">
                <label>First name</label>
                <input
                  type="text"
                  title="firstname"
                  placeholder="Enter first name here"
                  onChange={(e) => setName(e.target.value)}
                  className={`${errors.name ? 'error' : ''} ${
                    isFormSubmitted ? 'success' : ''
                  }`}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-input">
                <label>Email address</label>
                <input
                  type="email"
                  title="email"
                  placeholder="Eg. johndoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${errors.email ? 'error' : ''} ${
                    isFormSubmitted ? 'success' : ''
                  }`}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-input">
                <label>Phone number</label>
                <input
                  type="text"
                  title="number"
                  placeholder="Eg. +475 23 409 7399"
                  onChange={(e) => setNumber(e.target.value)}
                  className={`${errors.number ? 'error' : ''} ${
                    isFormSubmitted ? 'success' : ''
                  }`}
                />
                {errors.number && (
                  <div className="error-message">{errors.number}</div>
                )}
              </div>

              <div className="form-input">
                <label>Department</label>
                <DepartmentSelect onDepartmentSelect={setDepartment} />
                {errors.department && (
                  <div className="error-message">{errors.department}</div>
                )}
              </div>

              <div className="form-input">
                <label>Qualification</label>
                <input
                  type="text"
                  title="qualification"
                  placeholder="Enter qualification"
                  onChange={(e) => setQualification(e.target.value)}
                  className={`${errors.qualification ? 'error' : ''} ${
                    isFormSubmitted ? 'success' : ''
                  }`}
                />
                {errors.qualification && (
                  <div className="error-message">{errors.qualification}</div>
                )}
              </div>

              <div className="form-error">
                {errors.form && (
                  <div className="error-message">
                    Please fill in all the required fields and ensure that the
                    information is accurate.
                  </div>
                )}
              </div>

              <div className="buttons">
                <button onClick={closeModal} className="btn-secondary">
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSubmit}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </section>
      </StyledAddUsers>
    </>
  );
};
