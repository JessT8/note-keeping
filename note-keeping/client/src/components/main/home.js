import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getNotes } from '../../store/actions/noteAction';
import AddNote from "../note/addNote";
import Notes from "../note/notes"
import Error from '../error/error';
import FilterOptionIcon from '../icon/filterOptionIcon.svg'
import SlideDrawer from '../slideDrawer/slideDrawer'
import '../../App.css';
import '../../styles.scss';

function Home(props) {
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [toggleAddNote, setToggleAddNote] = useState(false);
    const [filterNotes, setFilterNotes] = useState([]);
    const [filterTag, setFilterTag] = useState('');
    const [orderBy, setOrderBy] = useState({value:'', updated:true});

    const notes = useSelector( state => state.notes.notes);
    const isLoading = useSelector( state => state.notes.isLoading);
    const error = useSelector( state => state.notes.error);
    const dispatch = useDispatch();

    //takes in notes and rearrange them
    const rearrangeNotes = useCallback(n => {
        const currentOrder = orderBy.value;
        const isOldest = (currentOrder === 'Oldest');
        const isAlphabetical =  (currentOrder === 'A-Z');
        const isReverse =  (currentOrder === 'Z-A');
        return n.sort((a,b)=>{
            if( isAlphabetical || isReverse ){
                let textA = a.title.toUpperCase();
                let textB = b.title.toUpperCase();
                if( isReverse ){
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                }else{
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                }
            }
            let idA = parseInt(a.id);
            let idB = parseInt(b.id);
            if(isOldest){
                return (idA < idB) ? -1 : (idA > idB) ? 1 : 0;
            }
            return (idA > idB) ? -1 : (idA < idB) ? 1 : 0;
        })
    }, [orderBy.value]);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch])

    //filter notes by tags and rearrange them
    useEffect(()=>{
        if(!isLoading){
            if(filterTag !== ''){
                const filteredNotes = notes.filter((note)=>
                    note.tags.some(t => t.name === filterTag));
                    if(filteredNotes.length !== 0){
                        setFilterNotes(rearrangeNotes(filteredNotes));
                    }else{
                        setFilterTag('');
                    }
            }else{
                setFilterNotes(rearrangeNotes([...notes]));
            }
        }
    }, [filterTag, notes, isLoading, rearrangeNotes])

    //fires when drop-down list value changes and rearrange notes
    useEffect(()=>{
        if(!orderBy.updated){
            const n = [...filterNotes];
            setFilterNotes(rearrangeNotes(n));
            setOrderBy( {...orderBy, updated: true} );
        }
    },[orderBy, filterNotes, rearrangeNotes])

    let noteColClass = "col"
    if(toggleDrawer) {
        noteColClass = 'col-9'
    };
    const noteComponent = (filterNotes.length) ? <Notes notes={filterNotes}/> :<div className="container-fluid w-100 h-100">
        <div className="row h-75 p-5">
            <div className="my-5 p-5 ">
                <p className="big-font text-center cinzel-font">Currently no notes</p>
            </div>
        </div>
        </div>;

    return (
        <div className="mt-5">
            <div className="container-fluid">
                <div className="App-main">
                    <header className="pt-5">
                        <h1 className="nunito-font">My notes</h1>{ (error) ? '':
                        <button className="toggleAdd"
                                onClick={()=>{setToggleAddNote(true)}}>
                                +
                        </button>}
                    </header>
                    {toggleAddNote && <AddNote close={()=>setToggleAddNote(false)}/>}
                    <div className="container">
                        <div className="row no-gutters mt-3">
                            <div className="gear col-md-3 col-sm-12">
                                <button className="gear-btn ml-5"
                                        onClick={()=>{setToggleDrawer(!toggleDrawer)}}>
                                        <img src={FilterOptionIcon} alt="gear"/>
                                        <span className="mx-1">Filter</span>
                                </button>
                            </div>
                            <div className="col-md-5 ml-5">
                                <label className="mr-3" for="orderBy-select">Order by:</label>
                                <select className="orderBy" id="orderBy-select" onChange={(e)=>{setOrderBy({value:e.target.value, updated:false})}}>
                                    <option value="Default">Newest to Oldest</option>
                                    <option value="Oldest">Oldest to Newest</option>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {(!isLoading && !error) ?
                    <div className="container-fluid">
                        <div className="row">
                            <SlideDrawer show={toggleDrawer}
                                         filterNotes={(tag)=>{setFilterTag(tag)}}
                                         filterTag={filterTag}
                                         close={()=>setToggleDrawer(false)}/>
                            <div className={noteColClass}>
                                {noteComponent}
                            </div>
                        </div>
                    </div> : (error) ? <Error/> : 'Loading'}
                </div>
            </div>
        </div>
    );
}

export default Home;