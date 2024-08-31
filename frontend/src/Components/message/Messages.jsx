import {Button, Card, Form} from "react-bootstrap";
import {useGetMessagesQuery} from "../../services/messageApi";


const Messages = () => {
    const { data: messages = [] } =useGetMessagesQuery();
    console.log(messages);

    return (
        <Card className="col p-0 h-100 bg-light" style={{ borderRadius: "0 20px 20px 0"}}>
            <div className="d-flex flex-column h-100">
                <div className="text-white mb-4 p-3  small" style={{ background: '#831d0b', borderRadius: "0 20px 0 0" }}>
                    <p className="m-0">
                        <b># general</b>
                    </p>
                    <span className="text-white-50 ">2 сообщения</span>
                </div>
                <div id="messages-box" className="chat-message overflow-auto px-5">
                    <div className="text-break mb-2">
                        <b>admin</b>
                        : Hello
                    </div>
                </div>
                <div className="mt-auto px-5 py-3">
                    <Form className="py-1 border-0 rounded-2">
                        <Form.Group className="input-group has-validation">
                            <Form.Control className=' p-0 ps-2' placeholder="Введите сообщение..."/>
                            <Button className="border-0" style={{ background: '#831d0b' }}>Отправить</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>

        </Card>
    )
};

export default Messages;