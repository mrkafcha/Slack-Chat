import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Channels from '../components/channels/Channels';
import Messages from '../components/messages/Messages';

const Home = () => (
    <div style={{height: '80vh'}}>
        <Container fluid className="container h-100 my-4 overflow-hidden rounded  align-self-stretch">
            <div className="row h-100 flex-md-row">
                <Channels />
                <Messages />
            </div>
        </Container>
    </div>

);
export default Home;