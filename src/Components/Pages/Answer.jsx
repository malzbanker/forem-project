
import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from '../../configaxios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from "../ContextAPI/Context";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";

const Answer = () => {
const [userData, setUserData] = useContext(UserContext);
const navigate = useNavigate();
const answerDom = useRef();
const { id } = useParams();
console.log(userData)
const handleEvent = async (e) => {
e.preventDefault();
const answerValue = answerDom.current.value;


if (!answerValue) {
  alert('Please enter all required fields.');
  return;
}

try {
  const token = localStorage.getItem('token');

  await axios.post(`/answers/addanswer/${id}`, {
    questionid: id,
    userid: userData.userid,
    answer: answerValue,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(answerValue, userData.userid, id)

  alert('Submitted answer successfully.');
  navigate('/');
} catch (error) {
  console.log(error);
}
};

const [data, setData] = useState([]);
const [singleData, setSingleData] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case when the token is missing
      console.log('Token is missing');
      return;
    }

    try {
      const Data  = await axios.get(`/questions/singlequestion/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response?.data);
      // const answers  = response?.data;
   
      setSingleData(Data?.data?.question);
      console.log(Data);
      // console.log(answers);
    } catch (error) {
      console.log('Error:', error);
      // Handle the error appropriately
    }
  };

  fetchData();
}, []);
useEffect(() => {
const token = localStorage.getItem('token');
axios.get(`/answers/getanswer/${id}`, {
headers: {
Authorization: `Bearer ${token}`,
},
})
.then(response => {
console.log(response.data);
  const { answers } = response?.data;
  
setData(answers);
  console.log(answers);
 
})
  
.catch(error => {
console.log('Error:', error);
});
}, []);

return (
<div className='answer'>
<div className='mt-14 max-w-[1000px] mx-auto'>
<section className='border-b border-b-gray-400 mb-10'>
<h2 className='mb-2 text-3xl'>Questions</h2>
<section className="" key="id">

{ singleData?.map(question => (
<div key={question.answerid}>
<div>
<div className="md:flex justify-between max-w-[1400px]">
<div className="md:flex justify-around ">
<div className="mr-10">
{/* <FaUserCircle size={80} /> */}
            {/* <div className="text-sm">{data?.question.username}</div> */}
            <div className="text-2xl mt-2">{question.title}?</div>
            <div className="text-sm mt-2">{question.description}</div>
</div>

</div>
<Link to={`singlequestion/${question.id}`}>
<div className="">
{/* <MdArrowForwardIos size={30} /> */}
</div>
</Link>
</div>
<hr className="text-red-400 my-3" />
</div>
</div>
))}

{singleData?.length === 0 && !error && (
<p>
no question available !!
</p>
)}
</section>
      </section>
      
    <section className='border-b border-gray-400 mb-5'>
      <h2 className='mb-3 text-3xl border-b border-gray-400 mb-5 '>Answer From The Community</h2>
      <div className='' key='id'>
        {/* Render the fetched data */}
        {data.map(answer => (
          <div key={answer.keyid}>
            <div>
              <div className='md:flex justify-between max-w-[1400px]'>
                <div className='md:flex justify-around '>
                  <div className='mr-10'>
                    <FaUserCircle size={80} />
                    <div className='text-sm ' >{answer.username}</div>
                  </div>
                  <div className='text-sm mt-5'>{answer.answer}</div>
                </div>
                <Link to={`answer/${id}`}>
                  <div className=''>
                    {/* <MdArrowForwardIos size={30} /> */}
                  </div>
                </Link>
              </div>
              <hr className='text-red-400 my-3' />
            </div>
          </div>
        ))}
        {/* Fallback content if data is empty */}
        {data.length === 0 && (
          <p>No answers available.</p>
        )}
      </div>
    </section>

    <section>
      <h2 className='mb-3 text-2xl'>Your Answer</h2>
      <form onSubmit={handleEvent}>
        <textarea
          ref={answerDom}
          placeholder='Write your answer here...'
          className='w-full p-3 border border-gray-400 rounded-lg'
          rows='5'
        ></textarea>
        <button
          type='submit'
          className='px-4 py-2 mt-3 mb-3 text-white bg-blue-500 rounded hover:bg-blue-600'
        >
          Submit Answer
        </button>
      </form>
    </section>
  </div>
</div>
);
};

export default Answer;