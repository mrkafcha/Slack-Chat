import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useGetChannelsQuery, channelsApi,
} from '../../api/channels';
import { setChannelModal } from '../../store/slices/appSlice';
import socket from '../../socket';
import Channel from './Channel';
import { appPaths } from '../../routes';
import useAuth from '../../hooks';
import ModalContainer from '../modals';
import Card from "react-bootstrap/Card";

const Channels = () => {
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
            dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
                draft.push(channel);
            }));
        };
        const handleRemoveChannel = ({ id }) => {
            dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((curChannels) => curChannels.id !== id)));
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

        <Card className="col-4 col-md-3 px-0 bg-light flex-column h-100 d-flex" style={{ borderRadius: "20px 20px 20px 20px"}}>
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('channels.title')}</b>
                <Button className="p-0 text-primary btn btn-group-vertical bg-light border-0" onClick={() => handleShowModal('adding')}>
                    <svg width="20px" height="20px" viewBox="-3 -6 40 40" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">

                        <title>align-left</title>
                        <desc>Created with Sketch Beta.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" fill="none" >
                            <g transform="translate(-308.000000, -206.000000)" fill="#831d0b">
                                <path
                                    d="M335,222 L309,222 C308.447,222 308,222.448 308,223 C308,223.553 308.447,224 309,224 L335,224 C335.553,224 336,223.553 336,223 C336,222.448 335.553,222 335,222 L335,222 Z M324,230 L309,230 C308.447,230 308,230.447 308,231 C308,231.553 308.447,232 309,232 L324,232 C324.553,232 325,231.553 325,231 C325,230.447 324.553,230 324,230 L324,230 Z M309,208 L335,208 C335.553,208 336,207.553 336,207 C336,206.448 335.553,206 335,206 L309,206 C308.447,206 308,206.448 308,207 C308,207.553 308.447,208 309,208 L309,208 Z M309,216 L327,216 C327.553,216 328,215.553 328,215 C328,214.448 327.553,214 327,214 L309,214 C308.447,214 308,214.448 308,215 C308,215.553 308.447,216 309,216 L309,216 Z"
                                    id="align-left">
                                </path>
                            </g>
                        </g>
                    </svg>
                </Button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((channel) => <Channel key={channel.id} data={channel}/>)}
            </ul>
            <ModalContainer/>
        </Card>
    );
};

export default Channels;