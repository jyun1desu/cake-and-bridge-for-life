import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { color } from 'style/theme';
import { themeState  } from 'store/theme';
import Modal from 'components/Global/Modal';
import Button from 'components/Global/Button';

const themeData = {
  light: { 
      bg: 'white',
      border: `1px solid transparent`,
      title_fg: color.$default_font_color,
  },
  dark: { 
      bg: color.$dark_dim_bg_color,
      border: `1px solid ${color.$dark_dim_border_color}`,
      title_fg: color.$dark_default_font_color,
  },
}

const getCancelButtonStyle = (theme) => {
    switch(theme){
      case 'light':
      default:
        return `
          background-color: ${color.$unable_color};
          color: white;
        `
      case 'dark':
        return `
          background-color: transparent;
          color: ${color.$dark_dim_border_color};
          border: 1px solid ${color.$dark_dim_border_color};
        `
    }
}

const CancelButton = styled(Button)`
    ${({theme}) => getCancelButtonStyle(theme)}
`
const getSubmitButtonStyle = ({theme, isActive=false}) => {
    switch(theme){
      case 'light':
      default:
        return `
          background-color: ${isActive ? color.$pink_color : color.$unable_color};
          color: white;
        `
      case 'dark':
        const styleColor = isActive ? color.$fluorescent_pink_color : color.$dark_dim_border_color
        return `
          background-color: transparent;
          color: ${styleColor};
          border: 1px solid ${styleColor};`
    }
}

const SubmitButton = styled(Button)`
    ${({theme, isActive}) => getSubmitButtonStyle({theme, isActive})}
`

const Icon = styled.div`
  &.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 38px;
    height: 9px;
  }
  &.lds-ellipsis div {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: white;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  &.lds-ellipsis div:nth-child(1) {
    left: 4px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  &.lds-ellipsis div:nth-child(2) {
    left: 4px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  &.lds-ellipsis div:nth-child(3) {
    left: 16px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  &.lds-ellipsis div:nth-child(4) {
    left: 28px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(12px, 0);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`

const Loading = () => (<Icon className="lds-ellipsis"><div></div><div></div><div></div><div></div></Icon>)

const ContactForm = styled.form`
    display: flex;
    width: 55vw;
    padding: 15px;
    border-radius: 5px;
    flex-direction: column;
    z-index: 40;
    transition: .5s all;
    background-color: ${({theme}) => themeData[theme].bg };
    border: ${({theme}) => themeData[theme].border };

    p {
        text-align: center;
        padding-bottom: 10px;
        letter-spacing: 1px;
        &.title {
            transition: .5s all;
            color: ${({theme}) => themeData[theme].title_fg };
            border-bottom: 1px solid ${color.$under_line_color};
        }
        &.success{
            font-size: 18px;
            letter-spacing: 2px;
            transition: .5s all;
            color: ${({theme}) => themeData[theme].title_fg };
        }
    }

    textarea {
        margin-top: 10px;
        padding: 5px;
        height: 40vw;
        resize: none;
        border-radius: 3px;
        letter-spacing: 1px;
        border-color: ${color.$under_line_color};

        &:focus {
            outline: none;
        }
    }

    .button_area {
        margin: 10px 0 0 auto;
        button {
            & + button {
                margin-left: 10px;
            }
        }
    }
`

const ModalSendAdvice = () => {
  const [state, handleSubmit] = useForm("mnqlqyjv");
  const [inputContent, setInputContent] = useState('');
  const [theme] = useRecoilState(themeState);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputContent) return;
    handleSubmit(e);
  }

  const handleClose = () => {
    setInputContent('');
    // close modal;
  }

  return (
    <Modal
      className="send_email_modal">
      <ContactForm 
        theme={theme}
        onSubmit={(e) => handleSend(e)}>
        {state.succeeded
          ? (<>
            <p className="success">寄送成功</p>
            <SubmitButton
              isActive
              theme={theme}
              onClick={handleClose}
              type="button">
              關閉視窗
            </SubmitButton>
          </>)
          : (<>
            <p className="title">歡迎告訴我任何意見</p>
            <textarea
              onChange={(e) => setInputContent(e.target.value)}
              id="message"
              name="message"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <div className="button_area">
              <CancelButton
                onClick={handleClose}
                theme={theme}
                type="button"
                disabled={state.submitting}>
                取消
              </CancelButton>
              <SubmitButton
                isActive={!!inputContent}
                theme={theme}
                type="submit"
                disabled={state.submitting || !inputContent}>
                {state.submitting ? <Loading /> : '送出'}
              </SubmitButton>
            </div>
          </>)
        }
      </ContactForm >
    </Modal >
  );
}

export default ModalSendAdvice