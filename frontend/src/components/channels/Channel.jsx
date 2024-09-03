
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeChannel, setChannelModal } from '../../store/slices/appSlice';

const Channel = ({ data }) => {
    const { t } = useTranslation();
    const currentChannelId = useSelector((state) => state.app.currentChannelId);
    // const variantStyle = data.id === currentChannelId ? { background: '#831d0b', color: 'white' } : { background: '#f8f9fa', color: 'black' };
    const variantButton = data.id === currentChannelId ? 'secondary' : 'light';
    const dispatch = useDispatch();
    const switchChannel = () => {
        const { id, name } = data;
        if (id !== currentChannelId) {
            dispatch(changeChannel({ id, name }));
        }
    };
    const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
        dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
    };
    return (
        <li className="nav-item w-100">
            {data.removable ? (
                <Dropdown as={ButtonGroup} drop="down" className="w-100 ">
                    <Button onClick={() => switchChannel()} className="w-100 rounded-0 text-start text-truncate btn " variant={variantButton} >{`# ${data.name}`}</Button>

                    <Dropdown.Toggle as={Button} className="text-end border-0" split variant={variantButton}
                                     id={`dropdown-split-button${data.id}`}>
                        <span className="visually-hidden">{t('dropdown.toggle')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => handleShowModal('removing', data)}>{t('channels.dropdown.delete')}</Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => handleShowModal('renaming', data)}>{t('channels.dropdown.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Button
                    as={ButtonGroup}
                    name={data.name}

                    variant={variantButton}
                    className="w-100 text-start btn border-0"
                    onClick={() => switchChannel(data)}
                >
                    # {data.name}
                </Button>
            )}
        </li>
    );
};

export default Channel;