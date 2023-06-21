import React, { useState } from 'react';
import { Card, Feed, Button, Header, Image, Modal } from 'semantic-ui-react';

const Rank = () => {
  const [open, setOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState('');

  const feedEvents = [
    {
      image: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
      date: '1 day ago',
      summary: 'You added Jenny Hess to your coworker group.',
    },
    {
      image: 'https://react.semantic-ui.com/images/avatar/small/molly.png',
      date: '3 days ago',
      summary: 'You added Molly Malone as a friend.',
    },
    {
      image: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
      date: '4 days ago',
      summary: 'You added Elliot Baker to your musicians group.',
    },
  ];

  //랭킹 사진 클릭 했을 떼 -> 
  const handleSummaryClick = (summary, image) => {
    setSelectedSummary(summary, image);
    setOpen(true);
  };

  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>Ranking</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {feedEvents.map((event, index) => (
              <Feed.Event key={index}>
                <Feed.Label image={event.image} onClick={() => handleSummaryClick(event.summary)}
                    style={{ cursor: 'pointer' }} />
                    
                <Feed.Content>
                  <Feed.Date content={event.date} />
                  <Feed.Summary
                    onClick={() => handleSummaryClick(event.summary)}
                    style={{ cursor: 'pointer' }}
                  >
                    {event.summary}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>

          <Modal
            onClose={() => setOpen(false)}
            open={open}
          >
            <Modal.Header>Summary Details</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                
                <Header>{selectedSummary}</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => setOpen(false)}>
                닫기
              </Button>
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Rank;
