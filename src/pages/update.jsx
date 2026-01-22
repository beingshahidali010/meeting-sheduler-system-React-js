import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom'

function UpdateMeeting() {
  const [meeting, updateMeeting] = useState({
    meetingTitle: '',
    meetingDetails: '',
    meetingDate: '',
    meetingDuration: '',
    meetingLocation: '',
    meetingMembers: [{name: '', email: ''}],
  })
  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    updateMeeting ({...meeting, [name]: value});
  }
  const navigate = useNavigate();
  const params = useParams();
  const userId = localStorage.getItem('userId')
  useEffect(()=> {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/${params.id}`);
        updateMeeting(res.data)
      } catch (error) {
        toast.error('Failed to Fetch the Meeting')
      }
    }
    fetchMeeting()
  }, [params.id]);
  
  const addMember = () => updateMeeting({...meeting, 
    meetingMembers: [...meeting.meetingMembers, {name:'', email:''}]});

    const removeMember = i => updateMeeting({...meeting, 
    meetingMembers: meeting.meetingMembers.filter((_, idx)=> idx!==i)});

    const updateMember = (index, field, value) => {
    const updatedMembers = [...meeting.meetingMembers]; 
    updatedMembers[index][field] = value; 
    updateMeeting({
      ...meeting,
      meetingMembers: updatedMembers
    });
  };
      
   async function submitHandler(e){
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:8000/meetings/update/${meeting._id}`, {
      ...meeting,
      userId,
      meetingId: params.id
      })
      if(res.data.succes){
      toast.success(res.data.msg)
      navigate('/')
      }
      console.log(res);
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
  function editMeeting(){
    const params = useParams()
    console.log(params)
  }
  return (
    <div className="w-50 mx-auto my-4">
      <div className='d-flex justify-content-between aligment-content-center mb-2'>
      <h2>Update Meetings</h2>
      <Button variant='primary' onClick={() => navigate('/')} >View All Meeting</Button>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Meeting Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Team Sync"
            name="meetingTitle"
            value={meeting.meetingTitle}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Meeting Details</Form.Label>
          <Form.Control
            type="text"
            placeholder="Weekly team meeting"
            name="meetingDetails"
            value={meeting.meetingDetails}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Meeting Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="e.g, 2020-01-10'"
            name="meetingDate"
            value={meeting.meetingDate}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Meeting Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g 30"
            name="meetingDuration"
            value={meeting.meetingDuration}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Meeting Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Zoom"
            name="meetingLocation"
            value={meeting.meetingLocation}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Meeting Members</Form.Label>
          {meeting.meetingMembers.map((member, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Control placeholder="Jhon" type='text' value={member.name} 
            onChange={(e) => updateMember(index, 'name', e.target.value)} className="me-2"/>
            <Form.Control placeholder="Jhon@gmail.com" type='email' value={member.email} 
            onChange={(e) => updateMember(index, 'email', e.target.value)} className="me-2"/>
            {index>0 && <Button variant="danger" onClick={()=>removeMember(index)}>X</Button>}
          </div>
        ))}
        <Button variant="primary" type="button" className="mt-1" onClick={addMember}>
        + Add Member
        </Button>
        </Form.Group>
        <Button type="submit" variant="success" onClick={() => navigate(`/meetings/update/${meeting._id}`)}>
          Update Meeting
        </Button>
      </Form>
    </div>
  )
}

export default UpdateMeeting
