import React, {useEffect,useState, useContext} from 'react'
import { FaUserCircle } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { Link,useParams, useNavigate } from 'react-router-dom';
import axios from '../../configaxios'
import { UserContext } from "../ContextAPI/Context";

const Home = () => {
const navigate= useNavigate();
  const [userData, setUserData] = useContext(UserContext);
const id= useParams()
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/questions/allquestion',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setData(response.data.questions);
      })
      .catch(error => {
        console.log('Error:', error);
      });
      
  }, []);

  return (
    <div className='container-fluid sm:my-36 md:my-16'>
<section className='container sm:block sm:mx-16 md:flex flex-row justify-between max-w-[1000px] mx-auto '>
  
        <div className=''><Link to='/question'><button className='bg-blue-600 px-10 py-2 sm:my-2'>Ask Questions</button></Link></div>
        <input className='bg-white border-solid border-4 border-light-blue-500 rounded' type='text' placeholder='search question'></input>
        <div className=''>Wellcome: <small className='text-pink-900	text-xl'> {userData?.data?.username}</small> </div>

</section>
<div className=' sm:mx-8 md:mx-64 text-2xl'><h2 className='my-5 text-2xl'>Questions</h2>
<p className='my-3'>
  <hr/></p>
<section className='sm:mx-8 md:-mx-16 '>
    <div className='' key='id'>
      
      {/* Render the fetched data */}
       {data.map(item => (
        <div>
          <div key={item.questionid}></div>
        <div className='md:flex justify-between max-w-[1400px]'>
        <div className='md:flex justify-round '>
            <div className='mr-10 sm:flex '>    <Link to={`answer/${item.questionid}`} ><FaUserCircle size={80}  /></Link>
            <div className='text-xl sm:my-5 sm:mx-4 ' >{item.username}</div>
        </div>
          
        <div className='text-sm '>{item.description} ?</div>
        
        </div>
        
        <Link to={`answer/${item.questionid}`}><div className='sm:hidden md:block' ><MdArrowForwardIos size={30}/></div></Link>

        </div>
        <hr className='text-red-400 my-3'/>
        </div>
      ))}       
         </div> 
     </section> 
    </div>
    </div>
  )
}
export  default Home;



