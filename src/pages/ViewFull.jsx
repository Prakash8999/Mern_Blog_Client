import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "..";

import { format, formatISO9075 } from "date-fns";
import extractToken from "../utils/GetToken";
import Navbar from "../components/Navbar";

const ViewFull = () => {
  const { id } = useParams();

  const [data, setData] = useState("");

  useEffect(() => {
    if (id && extractToken())
      axios(`${server}/readpost/${id}`, {
        method: "GET",
      }).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, [id]);
  return (
    <>
      <div className="">
        <div className="bg-[#F8F8F8]  ">
          <Navbar />
          <div className="flex flex-col items-center gap-y-1">
            <div className="font-bold text-3xl text-center pt-3 ">
              {data?.title}
            </div>
            {/* <div>{format(new Date(data?.createdAt), "d MM, yyyy")}</div> */}
            <div>{data?.createdAt?.toString().split("T")[0]}</div>

            <div className="flex items-center  gap-x-2 pb-3 ">
              <p className="font-semibold">by</p>{" "}
              <p className="font-semibold">@{data?.userId?.username}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className=" flex justify-center    bg-opacity-10">
              <img
                src={data?.image}
                className="md:w-[70vw] md:h-[80vh] h-[35vh] object-cover rounded-md drop-shadow-md"
                alt=""
              />
            </div>
          </div>

          {/* <p>{data?.summary}</p> */}
          <div className="flex justify-center items-center pt-4">
            <div className="md:w-[80vw] px-5">
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: data?.content }}
              />
            </div>
          </div>

          <div className="pt-10 pb-4 flex justify-center">
            <p className="font-semibold">Thanks for reading!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFull;
