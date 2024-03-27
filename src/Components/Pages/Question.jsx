import React, { useRef } from 'react';

import axios from '../../configaxios';
import { useNavigate } from 'react-router-dom';


const Question = () => {
  const navigate = useNavigate();
  const titleDOM = useRef();
  const descriptionDOM = useRef();

  const handleEvent = async (e) => {
    e.preventDefault();

    const titleValue = titleDOM.current.value;
    const descriptionValue = descriptionDOM.current.value;

    if (!titleValue || !descriptionValue) {
      alert('Please enter all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const { data } =await axios.post('/questions/askquestion',{
          title:titleValue,
          description:descriptionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      alert('Submitted questions successfully.');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className=" sm:my-32  md:my-2">
        <h2 className="text-center font-bold text-2xl mt-10">Steps to Write Good Questions</h2>
        <div className="text-center mx-auto ">
          <ul className="text-sm justify-items-start ...">
            <li>Summarize your problem in one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expect.</li>
            <li>Review your questions and post it to the site.</li>
          </ul>
        </div>
        <form onSubmit={handleEvent} className="text-center mt-24 max-w-[1000px] boxshadow-2xl mx-auto rounded-2xl h-[300px] border mb-10 shadow-2xl">
          <h1 className="text-2xl">Ask Public Questions</h1>
          <p>Go to question pages.</p>
          <div>
            <input
              type="text" 
              ref={titleDOM}
              placeholder="Title"
              name="title"
              className="w-[90%] h-[40px] rounded-2xl border border-gray-400 my-2 bg-gray-300"
            />
          </div>
          <div className="">
            <textarea
              className="w-[90%] rounded-2xl h-[120px] border bg-gray-300"
              ref={descriptionDOM} name='description'
            ></textarea>
          </div>
          <button type='submit' className="bg-blue-400 py-1 px-10 my-2">
            Post Your Questions
          </button>
        </form>
      </section>
    </div>
  );
};

export default Question;


            