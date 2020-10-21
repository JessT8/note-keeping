import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getNotes } from '../../store/actions/noteAction';
import AddNote from "../note/addNote";
import Notes from "../note/notes"
import FilterOptionIcon from '../icon/filterOptionIcon.svg'
import SlideDrawer from '../slideDrawer/slideDrawer'
import '../../App.css';
import '../../styles.scss';

function Home(props) {
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [toggleAddNote, setToggleAddNote] = useState(false);
    const [filterNotes, setFilterNotes] = useState([]);
    const [filterTag, setFilterTag] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const dispatch = useDispatch();
    const notes = useSelector( state => state.notes.notes);
    const isLoading = useSelector( state => state.notes.isLoading);
    const error = useSelector( state => state.notes.error);
    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch])

    useEffect(()=>{
        if(!isLoading){
            if(filterTag!==''){
                let filteredNotes = notes.filter((note)=>
                    note.tags.some(t => t.name === filterTag));
                    if(filteredNotes.length !== 0){
                        setFilterNotes(filteredNotes);
                    }else{
                        setFilterTag('');
                    }
            }else{
                setFilterNotes(notes);
            }
        }
    }, [filterTag, notes, isLoading])
    useEffect(()=>{
        const n = [...filterNotes];
        n.sort(function(a,b){
            if(orderBy === 'A-Z' || orderBy === 'Z-A'){
                let textA = a.title.toUpperCase();
                let textB = b.title.toUpperCase();
                if(orderBy !=='A-Z' ){
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                }else{
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                }
            }
            let idA = parseInt(a.id);
            let idB = parseInt(b.id);
            if(orderBy === 'Oldest'){
                return (idA < idB) ? -1 : (idA > idB) ? 1 : 0;
            }
            return (idA > idB) ? -1 : (idA < idB) ? 1 : 0;
        })
        setFilterNotes(n);
    },[orderBy])

    let noteColClass = "col"
    if(toggleDrawer) {
        noteColClass = 'col-9'
    };
    if(error){
        return <Redirect to="/error" />
    }
    return (
        <div className="mt-5">
            <div className="container-fluid">
                <div className="App-main">
                    <header className="pt-5">
                        <h1 className="nunito-font">My notes</h1>
                        <button className="toggleAdd"
                                onClick={()=>{setToggleAddNote(true)}}>
                                +
                        </button>
                    </header>
                    {toggleAddNote && <AddNote close={()=>setToggleAddNote(false)}/>}
                    <div className="container">
                        <div className="row no-gutters mt-3">
                            <div className="gear col-2">
                                <button className="gear-btn ml-5"
                                        onClick={()=>{setToggleDrawer(!toggleDrawer)}}>
                                        <img src={FilterOptionIcon} alt="gear"/>
                                        <span className="mx-1">Filter</span>
                                </button>
                            </div>
                            <div className="col-1 mt-1 offset-4-md">
                                <p>Order by:</p>
                            </div>
                            <div className="col-2">
                               <select className="orderBy" onChange={(e)=>{setOrderBy(e.target.value)}}>
                                    <option value="Default">Newest to Oldest</option>
                                    <option value="Oldest">Oldest to Newest</option>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {!isLoading  &&
                    <div className="container-fluid">
                        <div className="row">
                            <SlideDrawer show={toggleDrawer}
                                         filterNotes={(tag)=>{setFilterTag(tag)}}
                                         filterTag={filterTag}
                                         close={()=>setToggleDrawer(false)}/>
                            <div className={noteColClass}>
                                <Notes notes={filterNotes}/>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Home;