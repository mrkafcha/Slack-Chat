import {Container, Navbar, Button} from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const AuthButton = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const logOut = () => {
        auth.logOut();
        navigate('/login');
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        auth.loggedIn || user
            ? <Button
                style={{ color: '#831d0b', background: '#dad5b5', borderRadius: '50px', borderColor: 'black'}}
                onClick={logOut}
            >
                Выйти
            </Button>
            : null
    );
};

const Header = () => (
    <Navbar className="shadow-lg" expand="lg" variant="light" style={{ background: '#57160a' }}>
        <Container>
            <Navbar.Brand className="text-white" href="/">Slack-Chat</Navbar.Brand>
            <AuthButton />
        </Container>

    </Navbar>
);

export default Header;