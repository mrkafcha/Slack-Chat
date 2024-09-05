import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery, messagesApi } from '../../api/messages';
import MessagesForm from './MessagesForm';
import SocketContext from '../../context/socket';

const Messages = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: messages = [] } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);
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
  }, [dispatch]);

  return (
    <Card className="col p-0 h-100 bg-light cardBorderRadius">
      <div className="d-flex flex-column h-100">
        <div className="text-white mb-4 p-3 bg-red-brown small headerMessageRadius">
          <p className="mb-0">
            <b>
              {`# ${currentChannelName}`}
            </b>
          </p>
          <span className="text-white-50">
            {t('messages.message', { count: filteredMessages.length })}
          </span>
        </div>
        <div className="chat-message overflow-auto px-5">
          {filteredMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b className="color-red-brown">{message.username}</b>
              :
              {' '}
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
