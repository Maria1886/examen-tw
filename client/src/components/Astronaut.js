import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Constants from "../modules/constants";

const Astronaut = () => {
    const { astrId } = useParams();
    const URL = useRef(process.env.NODE_ENV === 'production' ? Constants.ProdURL : Constants.LocalURL).current; 
    const [astr, setAstr] = useState(null);
    const formElem = useRef(null);
    const [success, setSuccess] = useState(undefined);

    useEffect( async () => {
        const response = await axios.get(URL + '/astronaut/' + astrId)
        console.log(response)
        setAstr(response)
    }, [])

    const handleDelete = async (e) => {
        setSuccess(undefined)
        try {
            const response = await axios.delete(URL + '/astronaut/' + e.target.value)
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
                astr == null ?
                <p>LOADING</p>
                :
                <div>
                    {astr.data.id}
                    <p>Name: {astr.data.name}</p>
                    <p>Role: {astr.data.role?.name}</p>
                    <button onClick={handleDelete} value={astr.data.id}>DELETE</button>
                </div>
            }
        </div>
    )
}

export default Astronaut;