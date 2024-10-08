import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const  {  products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData,setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      const currentItem = cartItems[items]; // Get the nested object, e.g., { M: 1 }
      
      for (const size in currentItem) { // 'size' corresponds to 'M' in your object
        if (currentItem[size] > 0) { // Check if the quantity is greater than 0
          tempData.push({
            _id: items,        // Use 'items' as the ID (e.g., 'aaaab')
            size: size,        // Use 'size' (e.g., 'M')
            quantity: currentItem[size], // The quantity (e.g., 1)
          });
        }
      }
    }
    setCartData(tempData); // Update the state with tempData
  }, [cartItems]);
  

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div>
        {
          cartData.map((item,index)=>{

            const productData = products.find((product)=> product._id === item._id);
            // console.log(productData);
            
            return(
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 ">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input className='border max-w-10 sm:max-w-20 px-1 sm:px-1 py-1' type="number" min={1} defaultValue={item.quantity} id="" />
                <img onClick={()=>updateQuantity(item._id,item.size,0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' alt="" />
              </div>
            )
          })
        }
      </div>

        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal/>
            <div className="w-full text-end">
              <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3' >PROCEED TO CHECKOUT</button>
            </div>
          </div>


        </div>


    </div>
  )
}

export default Cart