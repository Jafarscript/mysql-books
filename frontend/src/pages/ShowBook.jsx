// import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/property/${id}`)
      .then((response) => {
        setProperty(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  // console.log(property)

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Property Details</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-2">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          {property.Picture && (
            <div className="my-4">
              <img className="w-64 h-52" src={property.Picture} alt={property.Label} />
            </div>
          )}
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id:</span>
            <span>{property.id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Label:</span>
            <span>{property.Label}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Agent:</span>
            <span>{property.Agent}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year:</span>
            <span>{property.Year}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Category:</span>
            <span>{property.Category}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Market:</span>
            <span>{property.Market}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Neighbourhood:</span>
            <span>{property.Neighbourhood}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Price:</span>
            <span>{property.Price}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Year:</span>
            <span>{property.Year}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
