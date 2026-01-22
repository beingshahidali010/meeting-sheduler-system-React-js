import axios from 'axios'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [meeting, setMeeting] = useState([]);
    async function fetchMeeting() {
        const res = await axios.get('http://localhost:8000/')
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
  return (
    <div style={{width: '90%', margin: "auto"}} >
      <div className='d-flex justify-content-between aligment-content-center m-4'>
      <h1>Meetings</h1>
      <div className='d-flex justify-content-between aligment-content-center gap-3 '>
      <Button variant='primary' onClick={() => navigate('/create-meetings')}>
        Create Meeting</Button>
        <Button variant='success' onClick={() => navigate('/login')}>
        Login Here</Button>
      </div>
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
            <Button variant="success" onClick={() => navigate(`/meetings/employee-respond/${m._id}`)}>
            Employee</Button>
          </Col>
          <Col xs="auto">
            <Button variant="success" onClick={() => navigate('/meetings/manager-respond')}>
            Manager</Button>
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

export default Home
