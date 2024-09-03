import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks';

const Header = () => {
    const { logOut } = useAuth();
    const { t } = useTranslation();
    const app = useSelector((state) => state.app);
    const logOutUser = () => {
        logOut();
    };
    return (
        <Navbar className="shadow-lg" expand="lg" variant="light" style={{ background: '#57160a' }}>
            <Container>
                <Navbar.Brand className="text-white" href="/">Hexlet Chat</Navbar.Brand>
                {app.token
                    ? <Button
                        onClick={() => logOutUser()}
                        style={{ color: '#831d0b', background: '#dad5b5', borderRadius: '10px 10px 10px 10px', borderColor: 'black'}}
                    >
                        {t('header.logout')}
                    </Button>
                    : null
                }
            </Container>
        </Navbar>
    );
};

export default Header;