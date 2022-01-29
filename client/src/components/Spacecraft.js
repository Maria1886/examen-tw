import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Constants from "../modules/constants";

const Spacecraft = () => {
    const { spaceId } = useParams();
    const URL = useRef(process.env.NODE_ENV === 'production' ? Constants.ProdURL : Constants.LocalURL).current; 
    const [space, setspace] = useState(null);
    const formElem = useRef(null);
    const [success, setSuccess] = useState(undefined);

    useEffect( async () => {
        const response = await axios.get(URL + '/spacecraft/' + spaceId)
        console.log(response)
        setspace(response)
    }, [success])

    const handleSub = async (e) => {
        e.preventDefault();
        setSuccess(undefined)

        const data = {
            name: formElem.current?.name.value,
            max_speed: formElem.current?.max_speed.value,
            mass: formElem.current?.mass.value,
        }

        try {
            const response = await axios.put(URL + '/spacecraft/' + space.data.id, data)
            setSuccess(1)
        } catch (error) {
            setSuccess(2)
        }
    }

    return (
        <div>
            {
                success === 1?
                <p>Success.</p>:
                (success == 2 ?
                    <p>Error.</p>: null
                    )
            }
            {
                space == null ?
                <p>LOADING</p>
                :
                <>
                <div>
                    {space.id}
                    <p>Name: {space.data.name}</p>
                    <p>Speed: {space.data.max_speed}</p>
                    <p>Mass: {space.data.mass}</p>
                </div>
                <hr></hr>
                <div> {space.data.astronauts?.map(a =><div>
                    {a.id}
                    <p>Name: {a.name}</p>
                    <a href={`/astronaut/${a.id}`}>Proifl</a>
                </div> )}</div>
                </>
            }
            <hr></hr>
            <h1>Update spacecraft:</h1>
                <form onSubmit={handleSub} ref={formElem}>
                    <label>Name:</label>
                    <input 
                        name="name"
                        className="form-control" 
                        type="text"
                        minLength={3}
                    />
                    <label>Max speed:</label>
                    <input 
                        name="max_speed"
                        className="form-control" 
                        type="number"
                    />
                    <label>Mass:</label>
                    <input 
                        name="mass"
                        className="form-control" 
                        type="number"
                    />
                    <button type="submit">Submit</button>
                </form>
        </div>
    )
}

export default Spacecraft;