import {Button, Card, Spinner} from "react-bootstrap";
import {useGetChannelsQuery} from "../../services/channelsApi";
import Channel from "./Channel";



const Channels = () => {
    const { data: channels = [], isLoading } = useGetChannelsQuery();
    console.log(channels)

    if(isLoading) {
        return (
            <Spinner />
        );
    }

    return (
        <Card className="col-4 col-md-3 px-0 bg-light flex-column h-100 d-flex" style={{ borderRadius: "20px 0 0 20px"}}>
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button className="p-0 text-primary btn btn-group-vertical bg-light border-0">
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
                {channels.map((channel) => <Channel key={channel.id} channel={channel}/>)}
            </ul>
        </Card>

    )
};
export default Channels;