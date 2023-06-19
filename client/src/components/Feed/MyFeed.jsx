import React, { useEffect, useState }  from 'react';
import { Grid, Image, Card, Button, Modal, Container } from 'semantic-ui-react';
// import { Icon, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';



const MyFeed = () => {

    const [allboard, setAllBoard] = useState([]);
    const [mem, setMem] = useState ([]);
    const [open, setOpen] = useState(false); // 모달의 상태를 관리하는 state
    const [modalContent, setModalContent] = useState(null); // 모달에 표시될 내용을 관리하는 state
 


  const rows = [
    { columns: 4, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ts_tAWo1l-pgKkO4xCGSm0rt1XechFSTkA&usqp=CAU' },
    { columns: 4, imageUrl: 'https://react.semantic-ui.com/images/wireframe/image.png' },
    { columns: 4, imageUrl: 'https://react.semantic-ui.com/images/wireframe/image.png' }
  ];

  useEffect(() => {
    const url = "board.json";
    axios.get(url).then(res => {
      setAllBoard(res.data);
      console.log(res.data)

    });
  }, []);

  useEffect(() => {
    const url = "member.json";
    axios.get(url).then(res => {
      setMem(res.data);
      console.log(res.data)

    });
  }, []);

  const handleCloseModal = () => {
    setOpen(false);
};

const handleCardClick = () => {
    setModalContent(<div>
    
        카드클릭
        </div>);
    setOpen(true);
};

const handleButtonClick = () => {
    setModalContent(<div>버튼을 클릭했습니다.</div>);
    setOpen(true);
};

const handleGridItemClick = () => {
    setModalContent(<div>그리드 아이템을 클릭했습니다.</div>);
    setOpen(true);
};


  return (
    <div>
    <div style={{ display: 'flex', padding: '100px' }}>
        <div style={{ flex: 1, padding: '10px' }}>
        <Card onClick={handleCardClick}  >
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}  />
        <Card.Content>
        <Card.Header>닉네임</Card.Header>
        <Card.Meta>
            <span className='date'>가입날짜</span>
        </Card.Meta>
        <Card.Description>
            자기소개
               
        </Card.Description>
        </Card.Content>
        <Card.Content extra >
      
        </Card.Content>
        </Card>
        </div>
    

      <div style={{ flex: 1, padding: '50px' }}>
        <Button.Group vertical>
      
    <Button
      color='red'
      content='팔로우'
      icon ='thumbs up'
      onClick={handleButtonClick}
      label={{ 
        
        basic: true, 
        color: 'red', 
        pointing: 'left', 
        content: '0' 
    }}>
    </Button> 
       
          
    <Button
      color='blue'
      content='팔로워'
      icon ='thumbs up outline'
      onClick={handleButtonClick}
      label={{
        
        basic: true,
        color: 'blue',
        pointing: 'left',
        content: '0',
      }}
    />
    <Button
    
      color='black'
      content='게시글'
      icon='thumbs up outline'
      onClick={handleButtonClick}
      label={{
        
        basic: true,
        color: 'black',
        pointing: 'left',
        content: '1',
      }}
    />
    </Button.Group>
    </div>
     </div>
           
        <div>
        <Grid>
            {rows.map((row, rowIndex) => (
            <Grid.Row key={rowIndex} columns={row.columns}>
                {Array.from({ length: row.columns }).map((_, colIndex) => (
                <Grid.Column key={colIndex} onClick={handleGridItemClick}>
                    <Image src={row.imageUrl} />
                </Grid.Column>
                ))}
            </Grid.Row>
            ))}
        </Grid>
        </div>
           {/* 모달 부분 */}
           <Modal open={open} onClose={handleCloseModal} size="small">
                <Modal.Content>
                    {modalContent}
                </Modal.Content>
            </Modal>             
        
    </div>
  );
};

export default MyFeed;