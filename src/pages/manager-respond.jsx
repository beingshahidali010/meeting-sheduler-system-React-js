import axios from 'axios'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function ManagerRespond() {
    const [meeting, setMeeting] = useState([]);
    async function fetchMeeting() {
        const res = await axios.get('http://localhost:8000/')
        console.log(res.data)
        setMeeting(res.data)
    }
    useEffect(() => {
        fetchMeeting();
    },[])
    const navigate = useNavigate();
    const members = [
      {name: 'Monkey D. Luffy', email: 'luffy@gmail.com'},
      {name: 'Pirate Hunter Zoro', email: 'zoro@gmail.com'}
    ]
    const userId = localStorage.getItem('userId')
    async function deleteMeeting(meetingId) {
      try {
        const res = await axios.delete(`http://localhost:8000/meetings/delete/${meetingId}`,
          {data: {userId}}
        );
        if(res.data.succes){
          toast.success(res.data.msg);
          setMeeting(meeting.filter(m => m._id !== meetingId));
        }
      } catch (error) {
        toast.error(error.response.data.msg)
      }
    }

  return (
    <div style={{width: '90%', margin: "auto"}} >
      <div className='d-flex justify-content-between aligment-content-center m-4'>
      <h1>Manage Meetings</h1>
      <Button variant='primary' onClick={() => navigate('/')}>
        View All Meetings</Button>
      </div>
      {
        meeting.map((m) => {
          return (
            <Container className="my-4" style={{ width: "90%", margin: "auto" }}>
      <Card className="p-3">
        <Card.Title className="mb-3">{m.meetingTitle}</Card.Title>

        <Card.Text className="mb-2">
          <strong>Meeting Details:</strong> {m.meetingDetails}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Meeting Date: </strong> {m.meetingDate}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Meeting Duration:</strong> {m.meetingDuration}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Meeting Location: </strong> {m.meetingLocation}
        </Card.Text>

        <div className="mb-3">
          <strong>Invite Members:</strong>
          <ListGroup className="mt-2">
            {m.meetingMembers.map((member, index) => (
              <ListGroup.Item key={index}>
              <strong>Name:</strong>  {member.name} <br/>
              <strong>Email:</strong> {member.email} <br/>
              <strong>Status:</strong> {member.status}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <Row className="mt-3 justify-content-between align-items-center">
          <Col xs="auto">
            <Button variant="primary" onClick={() => navigate(`/meetings/update/${m._id}`)}>
            Update Meeting</Button>
          </Col>
          <Col xs="auto">
            <Button variant="danger" onClick={()=> deleteMeeting(m._id)}>
            Remove Meeting</Button>
          </Col>
        </Row>
      </Card>
    </Container>
          )
        })
      }
    </div>
  )
}

export default ManagerRespond
