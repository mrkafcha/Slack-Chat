import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery, messagesApi } from '../../api/messages';
import socket from '../../socket';
import MessagesForm from './MessagesForm';

const Messages = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: messages = [] } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);
  const messagesContainer = useRef();
  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(newMessage);
      }));
    };
    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch, messagesContainer]);
  return (
    <Card className="col p-0 h-100 bg-light" style={{ borderRadius: '20px 20px 20px 20px' }}>
      <div className="d-flex flex-column h-100">
        <div className="text-white mb-4 p-3  small" style={{ background: '#831d0b', borderRadius: '20px 20px 0 0' }}>
          <p className="mb-0">
            <b>
              {`# ${currentChannelName}`}
            </b>
          </p>
          <span className="text-white-50">
            {t('messages.message', { count: filteredMessages.length })}
          </span>
        </div>
        <div className="chat-message overflow-auto px-5" ref={messagesContainer}>
          {filteredMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {message.message}
            </div>
          ))}
        </div>
        <MessagesForm />
      </div>
    </Card>
  );
};

export default Messages;
