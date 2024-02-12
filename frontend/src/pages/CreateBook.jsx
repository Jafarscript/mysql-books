// import React from 'react'
import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState('');
  const [market, setMarket] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [agent, setAgent] = useState('');
  const [picture, setPicture] = useState('');
  const [price, setPrice] = useState(null);
  const [year, setYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const handleSaveBook = () =>{
    const data = {
      label,
      category,
      market,
      neighbourhood,
      agent,
      picture,
      price,
      year
    }
    setLoading(true);
    axios
    .post('http://localhost:8080/property', data)
    .then(() => {
      setLoading(false)
      enqueueSnackbar('Book Created Successfully', {variant: 'success'})
      navigate('/')
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      enqueueSnackbar('An error has occurred', {variant: 'error'})
    })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Property</h1>
      {loading ?<div className="flex justify-center items-center mt-2">
         <Spinner />
       </div> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Label</label>
        <input type="text" value={label}
        onChange={(e) => setLabel(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Category</label>
        <input type="text" value={category}
        onChange={(e) => setCategory(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Market</label>
        <input type="text" value={market}
        onChange={(e) => setMarket(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Neighbourhood</label>
        <input type="text" value={neighbourhood}
        onChange={(e) => setNeighbourhood(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Agent</label>
        <input type="text" value={agent}
        onChange={(e) => setAgent(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Picture URL</label>
        <input type="text" value={picture}
        onChange={(e) => setPicture(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Price</label>
        <input type="text" value={price}
        onChange={(e) => setPrice(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-gray-500">Year</label>
        <input type="text" value={year}
        onChange={(e) => setYear(e.target.value)} 
        className="border-2 border-gray-500 px-4 py-2 w-full"
        />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  )
}

export default CreateBook