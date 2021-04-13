import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { color } from 'style/theme';
import styled from 'styled-components';
import Modal from 'components/Global/Modal';
import Button from 'components/Global/Button';

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
    background-color: white;
    display: flex;
    width: 55vw;
    padding: 15px;
    border-radius: 5px;
    flex-direction: column;
    z-index: 40;

    p {
        text-align: center;
        padding-bottom: 10px;
        letter-spacing: 1px;
        &.title {
            border-bottom: 1px solid ${color.$under_line_color};
        }
        &.success{
            font-size: 18px;
            letter-spacing: 2px;
        }
    }

    textarea {
        margin-top: 10px;
        padding: 5px;
        height: 40vw;
        resize: none;
        border-radius: 3px;
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
      <ContactForm onSubmit={(e) => handleSend(e)}>
        {state.succeeded
          ? (<>
            <p className="success">寄送成功</p>
            <Button
              onClick={handleClose}
              color={color.$pink_color}
              type="button">
              關閉視窗
                            </Button>
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
              <Button
                onClick={handleClose}
                color={color.$unable_color}
                type="button"
                disabled={state.submitting}>
                取消
                        </Button>
              <Button
                color={inputContent ? color.$green_color : color.$unable_color}
                type="submit"
                disabled={state.submitting || !inputContent}>
                {state.submitting ? <Loading /> : '送出'}
              </Button>
            </div>
          </>)
        }
      </ContactForm >
    </Modal >
  );
}

export default ModalSendAdvice