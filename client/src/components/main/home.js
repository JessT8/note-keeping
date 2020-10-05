import React, { useState, useEffect } from 'react';
import '../../App.css';
import AddForm from "../../addForm";
import Notes from "../note/notes"
import '../../styles.scss';
import FilterOptionIcon from '../icon/filterOptionIcon.svg'
import SlideDrawer from '../slideDrawer/slideDrawer'
import { useSelector, useDispatch} from 'react-redux'
import { getNotes } from '../../store/actions/noteAction';

function Home(props) {
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [filterNotes, setFilterNotes] = useState([]);
    const [filterTag, setFilterTag] = useState('');
    const dispatch = useDispatch();
    const notes = useSelector( state => state.notes.notes);
    const isLoading = useSelector( state => state.notes.isLoading);
    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch])

    useEffect(()=>{
        if(filterTag!==''){
            const filteredNotes = notes.filter((note)=>
                note.tags.some(t => t.name === filterTag));
            if(filteredNotes.length !== 0){
                setFilterNotes(filteredNotes);
            }else{
                setFilterTag('');
            }
        }else{
            setFilterNotes(notes);
        }
    }, [filterTag, notes])

    let noteColClass = "col"
    if(toggleDrawer) {
        noteColClass = 'col-9'
    };
    return (
        <div className="mt-5">
            <div className="container-fluid">
                <div className="App-main">
                    <header className="pt-5">
                        <h1 className="nunito-font">My notes</h1>
                        <button className="toggleAdd"
                                onClick={()=>{
                                    setToggle(true)}}>
                                +
                        </button>
                    </header>
                    {toggle && <AddForm close={()=>{setToggle(false)}}/>}
                    <div className="gear">
                        <button className="gear-btn ml-5"
                                onClick={()=>{setToggleDrawer(!toggleDrawer)}}>
                                <img src={FilterOptionIcon} alt="gear"/>
                                <span className="mx-1">Filter</span>
                        </button>
                    </div>
                    {!isLoading  &&
                    <div className="container-fluid">
                        <div className="row">
                            <SlideDrawer show={toggleDrawer}
                                         notes={notes}
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