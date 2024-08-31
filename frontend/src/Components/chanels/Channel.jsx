import {Button} from "react-bootstrap";

const Channel = ({ channel }) => {
    return (
        <li key={channel.id} className="nav-item w-100">
            <Button className="w-100 rounded-0 text-start btn btn-secondary"># {channel.name}</Button>
        </li>
    )
};
export default Channel;