import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {
  useGetChannelsQuery, channelsApi,
} from '../../api/channels';
import { setChannelModal } from '../../store/slices/appSlice';
import Channel from './Channel';
import { appPaths } from '../../routes';
import useAuth from '../../hooks';
import ModalContainer from '../modals';
import SocketContext from '../../context/socket';
import { messagesApi } from '../../api/messages';

const Channels = () => {
  const socket = useContext(SocketContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { data: channels = [], error: channelError } = useGetChannelsQuery();
  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
  };

  useEffect(() => {
    if (channelError?.status === 401) {
      logOut();
      navigate(appPaths.login());
    }
  }, [channelError, navigate, logOut]);

  useEffect(() => {
    const handleNewChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draft) => {
          draft.push(channel);
        },
      ));
    };
    const handleRemoveChannel = ({ id }) => {
      dispatch(messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draft) => (
          draft
            .filter((mess) => mess.channelId !== id)
        ),
      ));
      dispatch(channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draft) => draft.filter((curChannels) => curChannels.id !== id),
      ));
    };
    const handleRenameChannel = ({ id, name }) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft;
        const index = channel.findIndex((curChannels) => curChannels.id === id);
        channel[index].name = name;
      }));
    };
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);
    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);
  return (

    <Card className="col-4 col-md-3 px-0 bg-light flex-column h-100 d-flex cardBorderRadius">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <Button className="p-0 btn-group-vertical bg-light border-red-brown color-red-brown" onClick={() => handleShowModal('adding')}>
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => <Channel key={channel.id} data={channel} />)}
      </ul>
      <ModalContainer />
    </Card>
  );
};

export default Channels;
