import Header from "../components/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import {
  useAddUserMutation,
  useGetOneUserQuery,
  useUpdateUserMutation,
  userApi,
} from "../store/apiSlice";
import Dropzone from "react-dropzone";
import { Div, Para } from "../globalstyles";
import { useToast } from "../hooks/useToast";
import type {} from "redux-thunk/extend-redux";

const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.PRIMARY_TEXT};
  border-radius: 5px;
  color: ${({ theme }) => theme.PRIMARY_TEXT};
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND};
  display: flex;
  align-items: center;
  gap: 1rem;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::placeholder {
    color: #696363;
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.PRIMARY_TEXT};
`;

const ImageInputDiv = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 100%;
  border: 1px dashed ${({ theme }) => theme.PRIMARY_TEXT};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SelectField = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.PRIMARY_TEXT};
  border-radius: 5px;
  color: ${({ theme }) => theme.PRIMARY_TEXT};
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND};
  display: flex;
  align-items: center;
  gap: 1rem;
  outline: none;
  &:active {
    background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND};
  }
`;

type Details = {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
};

export default function AddUser() {
  const [detail, setDetail] = useState<Details>({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "male",
  });
  const [image, setImage] = useState<any>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const id = params.get("id");

  const [skip, setSkip] = useState(true);

  const [imageUrl, setImageUrl] = useState("");

  const [adduser,{isLoading:addLoading}] = useAddUserMutation();

  const [updateUser, {isLoading:updateLoading}] = useUpdateUserMutation();

  const { data, error } = useGetOneUserQuery({ body: { id: id } }, { skip });

  useEffect(() => {
    if (id) {
      setSkip(false);
      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        console.log(data);
        setDetail((prev) => {
          return {
            ...prev,
            name: data.name,
            email: data.email,
            phone: data.phone,
            age: data.age,
            gender: data.gender,
          };
        });
        setImageUrl(data.url);
      }
    }
  }, [error, data, id]);

  const fieldChangeHandler =
    (field: string) => (e: { target: { value: any } }) => {
      setDetail((prev) => {
        return { ...prev, [field]: e.target.value };
      });
    };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (detail.name.length <= 2 || detail.name.length > 30) {
      toast({
        title: "Invalid Name",
        info: "Enter a valid Name",
        code: "400",
        type: "error",
      });
      return;
    }

    if (+detail.age < 1 || +detail.age > 130) {
      toast({
        title: "Invalid Age",
        info: "Enter a valid Age",
        code: "400",
        type: "error",
      });
      return;
    }

    if (detail.email.length < 5) {
      toast({
        title: "Invalid Email",
        info: "Enter a valid Email",
        code: "400",
        type: "error",
      });
      return;
    }

    if (detail.phone.length !== 10) {
      toast({
        title: "Invalid Phone",
        info: "Enter a valid 10 Digit Phone Number",
        code: "400",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", detail.name);
    formData.append("age", detail.age);
    formData.append("email", detail.email);
    formData.append("phone", detail.phone);
    formData.append("gender", detail.gender);
    id && formData.append("id", id);
    formData.append("image", image as any);

    if (id) {
      updateUser(formData)
        .unwrap()
        .then(() => {
          toast({
            title: "Update User",
            info: "User updated Sucessfully",
            code: "200",
            type: "success",
          });
          navigate("/");
        })
        .catch((err) => {
          toast({
            title: "Error",
            info: `${err.data}`,
            code: "400",
            type: "error",
          });
        });
      return;
    }

    adduser(formData)
      .unwrap()
      .then((payload) => {
        dispatch(
          userApi.util.updateQueryData("getAllUsers", undefined, (state) => {
            state.push(payload);
          })
        );
        toast({
          title: "Create user",
          info: "User Created Successfully",
          type: "success",
          code: "201",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Create user",
          info: `${error.data}`,
          type: "error",
          code: "400",
        });
      });

    return;
  };

  return (
    <>
      <Header />
        <form onSubmit={submitFormHandler} encType="multipart/form-data" className="pb-20 pt-20">
          <Div className="rounded-lg w-6/12 max-lg:w-8/12 mx-auto">
            <Para className="text-center font-semibold text-3xl py-[20px] border-b-[1px] border-light-text dark:border-dark-secondary-text">
              {id ? "Update User" : "Add User"}
            </Para>
            <div className="flex max-lg:flex-col items-center justify-between gap-8 max-lg:p-[20px_0px_40px_0px] p-[20px_50px_40px_50px]">
              <div className="w-[35%]">
                <Dropzone
                  accept={{
                    "image/*": [".jpeg", ".png", ".jpg"],
                  }}
                  onDrop={(acceptedFiles) => {
                    console.log(acceptedFiles[0]);
                    if (acceptedFiles[0]) {
                      setImage(acceptedFiles[0]);
                      return;
                    }
                    return;
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input
                          {...getInputProps()}
                          accept="image/png,image/jpeg,image/jpg"
                        />
                        <div className="flex flex-col items-center gap-4">
                          <ImageInputDiv>
                            {image ? (
                              <img
                                src={`${URL.createObjectURL(image)}`}
                                alt="user"
                                className="object-cover h-[170px]"
                              />
                            ) : (
                              <div>
                                {id && imageUrl !== "" ? (
                                  <img
                                    src={imageUrl}
                                    alt="userImage"
                                    className="object-cover h-[170px]"
                                  />
                                ) : (
                                  <img src="user-1.png" alt="upload-icon" />
                                )}
                              </div>
                            )}
                          </ImageInputDiv>
                          <p className="py-2 px-10 bg-dark-primary dark:bg-light-secondary text-dark-text font-semibold dark:text-light-text outline-none border-none rounded-md cursor-pointer">
                            Browse
                          </p>
                          {/* <p onClick={removeImgHandler} className="py-1 mt-2 px-10 bg-dark-primary dark:bg-light-secondary text-dark-text font-semibold dark:text-light-text outline-none border-none rounded-md cursor-pointer">
                              Remove
                            </p> */}
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="w-[65%] flex flex-col gap-3">
                <div className="flex gap-5 max-lg:flex-col w-full">
                  <div>
                    <Label htmlFor="name">Name:</Label>
                    <InputField
                      type="text"
                      placeholder="Enter Users name"
                      id="name"
                      className="w-full"
                      onChange={fieldChangeHandler("name")}
                      value={detail.name}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age:</Label>
                    <InputField
                      type="number"
                      placeholder="Enter Users Age"
                      id="age"
                      className="w-full"
                      onChange={fieldChangeHandler("age")}
                      value={detail.age}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email:</Label>
                  <InputField
                    type="email"
                    placeholder="example@mail.com"
                    id="email"
                    className="w-full"
                    onChange={fieldChangeHandler("email")}
                    value={detail.email}
                  />
                </div>
                <div className="flex gap-5 max-lg:flex-col w-full">
                  <div>
                    <Label htmlFor="phone">Phone:</Label>
                    <InputField
                      type="number"
                      placeholder="1234567890"
                      id="phone"
                      className="w-full"
                      onChange={fieldChangeHandler("phone")}
                      value={detail.phone}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender:</Label>
                    <SelectField
                      className="w-full"
                      id="gender"
                      onChange={fieldChangeHandler("gender")}
                      value={detail.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </SelectField>
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-2 px-10 w-full bg-dark-primary dark:bg-light-secondary text-dark-text font-semibold dark:text-light-text outline-none border-none rounded-md"
                >
                  {addLoading || updateLoading ? (
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <>{id ? "Update User" : "Add User"}</>
                  )}
                </button>
              </div>
            </div>
          </Div>
        </form>
    </>
  );
}
