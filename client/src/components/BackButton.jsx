/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import './BackButton.css'

const BackButton = ({destination = '/'}) => {
  return (
    <div className="flex">
        <Link
        to={destination}
        className="custom-bg-sky-800 custom-text-white custom-px-4 custom-py-1 custom-rounded-lg custom-w-fit"
        >
        <BsArrowLeft className="arrow" />
        </Link>
    </div>
  )
}

export default BackButton