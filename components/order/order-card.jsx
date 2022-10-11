import ActiveRadio from '../base/ch-radio'
import { IconButton } from '@material-ui/core'
function OrderCard({ data, selected, setSelected, handleModal }) {

  const handleDelete = () => {
    if (handleModal) handleModal(data)
  }
  return (
    <div className="flex items-stretch w-full border px-2 py-3 rounded-lg mb-3">
      <ActiveRadio
        checked={selected === data.id}
        onChange={() => setSelected(data.id)}
        value={data.id}
        name="orderCard"
        id={`orderCard-${data.id}`}
        inputProps={{ 'aria-label': 'Card Selection' }}
      />
  <label htmlFor={`orderCard-${data.id}`} className="flex flex-col w-full cursor-pointer">
  <div className="flex flex-col ml-2 flex-grow">
        <div className="flex justify-between items-center">
          <div>
          <p className="font-semibold uppercase"> {data.card?.brand}</p>
            <span className="text-gray-500 md:text-base text-sm uppercase">
            XXXX-XXXX-XXXX-{data.card?.last4}
          </span>
          </div>
         
          <IconButton aria-label="delete" className='h-12 w-12'>
           <span className="material-icons-outlined text-3xl text-primary" onClick={handleDelete}>
              delete_outline
            </span>
           </IconButton>
          
        </div>
      </div>
  </label>
      
    </div>
  );
}

export default OrderCard;
