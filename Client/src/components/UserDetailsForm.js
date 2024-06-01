import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Container, Segment } from 'semantic-ui-react';
import { updateUserDetails } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const UserDetailsForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });
  let nav=useNavigate()

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(updateUserDetails(formData));
    setFormData({
      firstName: '',
      lastName: '',
      address: ''
    });
    
    toast.success('Details submitted successfully');
    nav("/home")
  };

  return (
    <Container textAlign='center'>
      <Segment padded='very' style={{ maxWidth: 500, margin: 'auto', marginTop: '100px' }}>
        <Form onSubmit={handleSubmit}>
            <h1> User  </h1>
          <Form.Input
            
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Form.Input
            
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Form.TextArea
            
            placeholder='Address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Button type='submit' primary>Submit</Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default UserDetailsForm;
