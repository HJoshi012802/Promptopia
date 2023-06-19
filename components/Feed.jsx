'use client';
import {useEffect,useState} from 'react';
import PromptCard from './PromptCard';

const Feed =()=>{
    const [searchText,setSearchText] = useState('');
    return (
       <section className='feed'>
        <form className='relative w-full flex-client'>
            <input
            type="input"
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'/>

        </form>
       </section>
    )
}

export default Feed;