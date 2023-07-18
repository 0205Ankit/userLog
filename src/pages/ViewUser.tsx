import Header from "../components/Header";
import styled from "styled-components";
import { Div, Para } from "../globalstyles";
import { useGetOneUserQuery } from "../store/apiSlice";
import { useSearchParams } from "react-router-dom";

export default function ViewUser() {
  const [params] = useSearchParams();
  const { data, error, isLoading } = useGetOneUserQuery({ body: { id: params.get("id") }});

  return (
    <>
      <Header />
      <div className="w-6/12 max-lg:w-8/12  mx-auto py-20">
        {!isLoading ? (
          <>
            {data ? (
              <Div className="rounded-md">
                <Para className="text-center font-semibold text-3xl py-[20px] border-b-[1px] border-light-text dark:border-dark-secondary-text">
                  View User
                </Para>
                <div className="flex gap-8 max-lg:flex-col max-lg:p-[20px_10px_40px_10px] my-5 items-center p-[20px_50px_40px_50px]">
                  <div className="max-lg:mx-auto overflow-hidden">
                    {data.url ? (
                      <img
                        className="w-[200px] h-[200px] rounded-md object-cover"
                        src={data.url}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-[200px] h-[200px] rounded-md"
                        src="user-1.png"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="w-[60%] max-lg:w-[80%] text-xl flex flex-col gap-5 overflow-scroll">
                    <div className="flex justify-between max-lg:flex-col max-lg:gap-5 max-lg:justify-center">
                      <Para className="max-lg:flex-col max-lg:gap-0  font-bold flex gap-4">
                        Name :
                        <span className="font-normal ">
                          {data.name[0].toUpperCase() +
                            data.name.slice(1, data.name.length)}
                        </span>
                      </Para>
                      <Para className="max-lg:flex-col max-lg:gap-0  font-bold flex gap-4">
                        Age : <span className=" font-normal">{data.age}</span>
                      </Para>
                    </div>
                    <Para className="max-lg:flex-col max-lg:gap-0  font-bold flex gap-4">
                      Email : <span className="font-normal ">{data.email}</span>
                    </Para>
                    <Para className="max-lg:flex-col max-lg:gap-0  font-bold flex gap-4">
                      Gender :
                      <span className="font-normal ">
                        {data.gender[0].toUpperCase() +
                          data.gender.slice(1, data.gender.length)}
                      </span>
                    </Para>
                    <Para className="max-lg:flex-col max-lg:gap-0  font-bold flex gap-4">
                      Phone : <span className="font-normal ">{data.phone}</span>
                    </Para>
                  </div>
                </div>
              </Div>
            ) : (
              <p className="text-center text-2xl py-10">
                Something went wrong...
              </p>
            )}
          </>
        ) : (
          <div
            className="inline-block h-8 w-8 animate-spin absolute top-2/4 left-2/4 text-dark-primary dark:text-dark-text rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
      </div>
    </>
  );
}
