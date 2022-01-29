import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Constants from "../modules/constants";

const Home = () => {
    const URL = useRef(process.env.NODE_ENV === 'production' ? Constants.ProdURL : Constants.LocalURL).current; 
    const [spaces, setSpaces] = useState(null);
    const formElem = useRef(null);
    const formElemAstr = useRef(null);
    const formElemFilter = useRef(null);
    const [success, setSuccess] = useState(undefined);

    useEffect( async () => {
        const response = await axios.post(URL + '/sfc/sort/', {page: 0})
        console.log(response.data)
        setSpaces(response.data)
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
            const response = await axios.post(URL + '/spacecraft/', data)
            setSuccess(1)
        } catch (error) {
            setSuccess(2)
        }
    }

    const handleSubAstr = async (e) => {
        e.preventDefault();
        setSuccess(undefined)

        const data = {
            name: formElemAstr.current?.name.value,
            role: formElemAstr.current?.role.value,
            spacecraft: formElemAstr.current?.spacecraft.value,
        }

        try {
            const response = await axios.post(URL + '/astronaut/', data)
            setSpaces(response.rows)
        } catch (error) {
            setSuccess(2)
        }
    }

    const handleSubFilter = async (e) => {
        e.preventDefault();
        setSuccess(undefined)

        const data = {
            speed: formElemFilter.current?.speed.value,
            mass: formElemFilter.current?.mass.value,
            page: 0
        }

        try {
            const response = await axios.post(URL + '/sfc/filter', data)
            setSpaces(response.rows)
        } catch (error) {
            setSuccess(2)
        }
    }

    const handleDelete = async (e) => {
        setSuccess(undefined)
        try {
            const response = await axios.delete(URL + '/spacecraft/' + e.target.value)
            setSuccess(1)
        } catch (error) {
            setSuccess(2)
        }
    }

    return (
        <div>{
                success === 1?
                <p>Success.</p>:
                (success == 2 ?
                    <p>Error.</p>: null
                    )
            }
            <div>
                <h1>Insert spacecraft:</h1>
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
            <hr></hr>
            <div>
                <h1>Insert astronaut:</h1>
                <form onSubmit={handleSubAstr} ref={formElemAstr}>
                    <label>Name:</label>
                    <input 
                        name="name"
                        className="form-control" 
                        type="text"
                        minLength={3}
                    />
                    <label>Role:</label>
                    <input 
                        name="role"
                        className="form-control" 
                        type="text"
                        minLength={3}
                    />
                    <label>Spacecraft:</label>
                    <input 
                        name="spacecraft"
                        className="form-control" 
                        type="text"
                        minLength={3}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <hr></hr>
            <h1>Spacecrafts sunt sortate dupa speed crescator</h1>
            <form onSubmit={handleSubFilter} ref={formElemFilter}>
                <label>Speed:</label>
                <input 
                    name="speed"
                    className="form-control" 
                    type="number"
                    minLength={3}
                />
                <label>Mass:</label>
                <input 
                    name="mass"
                    className="form-control" 
                    type="number"
                    minLength={3}
                />
                <button type="submit">Filtreaza dupa speed mai mare si mass mai mare</button>
            </form>
            {
                spaces == null ?
                <p>LOADING</p>
                :
                <div>
                    {spaces.map((s) => 
                    <div>
                        <p>{s.name}</p>
                        <button onClick={handleDelete} value={s.id}>Delete</button>
                        <a href={`/spacecraft/${s.id}`}>Profil</a>
                    </div>)}
                </div>
            }
        </div>
    )
}

export default Home;