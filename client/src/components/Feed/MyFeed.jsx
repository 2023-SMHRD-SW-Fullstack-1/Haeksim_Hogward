import React from 'react';
import { Grid, Image, Card, Button, } from 'semantic-ui-react';
import { Icon, Label } from 'semantic-ui-react';


const MyFeed = () => {

  
 


  const rows = [
    { columns: 4, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ts_tAWo1l-pgKkO4xCGSm0rt1XechFSTkA&usqp=CAU' },
    { columns: 4, imageUrl: 'https://react.semantic-ui.com/images/wireframe/image.png' },
    { columns: 4, imageUrl: 'https://react.semantic-ui.com/images/wireframe/image.png' }
  ];

  



  return (
    <div>
    <div style={{ display: 'flex', padding: '100px' }}>
        <div style={{ flex: 1, padding: '10px' }}>
        <Card >
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
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
      label={{ 
        
        basic: true, 
        color: 'red', 
        pointing: 'left', 
        content: '0' 
    }}
    /> 
       
          
    <Button
      color='blue'
      content='팔로워'
      icon ='thumbs up outline'
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
                <Grid.Column key={colIndex}>
                    <Image src={row.imageUrl} />
                </Grid.Column>
                ))}
            </Grid.Row>
            ))}
        </Grid>
        </div>
    </div>
  );
};

export default MyFeed;
