import React, {useEffect,useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import evangadilogo from '../../Images/Icons/0a0679d9-6cde-4a23-a3a5-88617777c215.png';
import { UserContext } from "../ContextAPI/Context";
const Navbar = () => {
  const [userData, setUserData] = useContext(UserContext);
  return (
    <>

      <nav className='   container-fluid navbar shadow-lg border-t-4 border-orange-200  sm:flex sm:justify-between '>
       <div className=' container md:max-w-[1000px] h-[70px] p-3  md:m-auto md:flex md:justify-between sm:block'>
          <Link to="/">
            <div className='nav-item nav-btn m-2 pb-3  '>
            <img src={evangadilogo}  className='h-[30px] mb-3' alt='Evangadi logo image'/>
            </div>
          </Link>
          <div className='md:flex md:justify-between sm:block mb-5'>
         
           <div className='m-3'> <Link to='/'>Hom </Link></div>
           <div className='m-3'> <Link to=''>How it works</Link></div>
            <div className='m-2'>
              <Link to={userData && '/login'} >
              {!userData ? (<button className='text-white bg-blue-700 hover:bg-yellow-600 box-border h-10 w-60  rounded '>login</button>) :
                (<button className='text-white bg-blue-700 hover:bg-yellow-600 box-border h-10 w-60  rounded '>logout</button>)
              }
              </Link>
              </div> 
        </div>
       </div>
        <div className='sm:block sm:mx-32 my-4  md:hidden' ><DensityMediumIcon/></div>
      </nav>
     
      </>
  );
}

export default Navbar;
