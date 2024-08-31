import { Container, Card } from 'react-bootstrap';
import Message from "../Components/message/Messages";
import Channels from "../Components/chanels/Channels";

const Home = () => {
    return (
        <div style={{height: '80vh'}}>
            <Container fluid className="container h-100 my-4 overflow-hidden rounded  align-self-stretch">
                <div className="row h-100 flex-md-row">
                    <Channels />
                    <Message />
                </div>
            </Container>
        </div>
    )
};

export default Home;