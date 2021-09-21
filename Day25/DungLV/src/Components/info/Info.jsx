import React from 'react';
import { Body, Content, Image, Username } from './styled';

export default function Info() {
  return (
    <Body>
      <Content>
        <Image src={localStorage.getItem('accessToken')} alt="avatar" />
        <Username>{localStorage.getItem('fullname')}</Username>
      </Content>
    </Body>
  );
}
