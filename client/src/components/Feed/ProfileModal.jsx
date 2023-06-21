import React, { useState } from 'react';
import { Button, Modal, Image, Header } from 'semantic-ui-react';

// 사용자 데이터 배열
// 각 사용자는 이름, 이메일, 이미지 URL을 가지고 있습니다.
const users = [
  {
    name: 'Rachel',
    email: 'rachel@example.com',
    imageUrl: 'https://react.semantic-ui.com/images/avatar/large/rachel.png',
  },
  {
    name: 'John',
    email: 'john@example.com',
    imageUrl: 'https://react.semantic-ui.com/images/avatar/large/john.png',
  },
  // 다른 사용자들...
];

// 각 사용자에 대해 모달을 표시하는 컴포넌트
function ProfileModal() {
  // 모달의 상태를 배열로 관리합니다. 각 모달이 열려 있는지 여부를 저장합니다.
  const [open, setOpen] = useState(Array(users.length).fill(false));

  // 모달을 열 때 호출되는 함수
  const handleOpen = index => {
    const newOpen = open.slice();
    newOpen[index] = true;
    setOpen(newOpen);
  };

  // 모달을 닫을 때 호출되는 함수
  const handleClose = index => {
    const newOpen = open.slice();
    newOpen[index] = false;
    setOpen(newOpen);
  };

  // 사용자 배열을 매핑하여 각 사용자에 대한 모달을 생성합니다.
  return users.map((user, index) => (
    <Modal
      key={index} // 고유 키를 설정해야 합니다 (여기서는 index를 사용했습니다).
      onClose={() => handleClose(index)}
      onOpen={() => handleOpen(index)}
      open={open[index]}
      trigger={<Button>Show Modal for {user.name}</Button>}
    >
      <Modal.Header>Select a Photo for {user.name}</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={user.imageUrl} wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>We've found the following gravatar image associated with your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => handleClose(index)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleClose(index)}
          positive
        />
      </Modal.Actions>
    </Modal>
  ));
}

// 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보냅니다.
export default ProfileModal;
