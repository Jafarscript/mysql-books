import BookSingleCard from "./BookSingleCard";


const BookCard = ({property}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {property.map(item => (
            <BookSingleCard property={item} key={item.id} />
        ))}
    </div>
  )
}

export default BookCard