import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Heading, Button, Box, StackDivider } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const PostCard = ({title, summary,image,author,createdAt,content,id}) => {
  return (
	<>
  <div className='grid grid-cols-2 ' >

  <div className="mx-auto md:h-[40vh] h-fit md:w-[45vw] w-[90vw]  bg-white rounded overflow-hidden shadow-lg flex">
      <img className="w-[35%] h-[90%] p-2 rounded-md hidden md:block pt-6" src={image} alt="Blog post" />
      <div className="flex flex-col justify-between px-6 py-4">
        <div className='flex flex-col gap-y-2 '>
          <div className="font-bold text-xl mb-2 mx-auto ">"{title }"</div>
          {/* <p className="text-gray-700 text-base">{summary}</p> */}
          <div dangerouslySetInnerHTML={{__html:content.substring(0, 200)+ "..."}}/>
        </div>
        <div className="flex justify-center w-full gap-x-3 mt-4 ">
          <span className="inline-block bg-gray-200 rounded-lg gap-x-2 px-3 py-1  font-light text-gray-700 ">
          Posted by  {author} 
          </span>
          <Link to={`/home/${id}`} className="inline-flex  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
        
        </Link>
        </div>
      </div>
    </div>
  </div>

	</>
  )
}

export default PostCard