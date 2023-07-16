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
import { Para } from "../globalstyles";
import ToastDemo from "../components/Toast";

const Div = styled.div`
  background-color: ${({theme})=>theme.SECONDARY_BACKGROUND};
`;

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
  border: 1px dashed ${({theme})=>theme.PRIMARY_TEXT};
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

type Details={
    name:string,
    email:string,
    phone:string,
    age:string,
    gender:string,
}


export default function AddUser() {
  const [detail, setDetail] = useState<Details>({
    name: "",
    email: "",
    phone: "",
    age:"",
    gender:"male"
  });
  const [image,setImage]=useState<any>()
  const navigate = useNavigate();
  // const [params] = useSearchParams();
  // const dispatch = useDispatch();
  // const id = +params.get("id");
  // const [skip, setSkip] = useState(true);
  // const { addToast } = useToasts();

  // const [adduser] = useAddUserMutation();

  // const [updateUser] = useUpdateUserMutation();

  // const {
  //   data: findData,
  //   error: findError,
  //   isLoading: findLoading,
  // } = useGetOneUserQuery({ body: { id: id } }, { skip });

  // useEffect(() => {
  //   if (id) {
  //     setSkip(false);
  //     if (findError) {
  //       console.log(findError);
  //       return;
  //     }

  //     if (findData) {
  //       setDetail((prev) => {
  //         return {
  //           ...prev,
  //           name: findData.info.name,
  //           email: findData.info.email,
  //           phone: findData.info.phone,
  //         };
  //       });
  //     }
  //   }
  // }, [findError, findData, findLoading, id]);

  const fieldChangeHandler = (field:string) => (e: { target: { value: any; }; }) => {
    setDetail((prev) => {
      return { ...prev, [field]: e.target.value };
    });
  };

  const submitFormHandler = async () => {
    // e.preventDefault();
    // if (detail.name.length <= 2 || detail.name.length > 30) {
    //   addToast("Invalid Name", {
    //     appearance: "error",
    //     autoDismiss: true,
    //   });
    //   return;
    // }

    // if (detail.phone.length !== 10) {
    //   addToast("Invalid Phone", {
    //     appearance: "error",
    //     autoDismiss: true,
    //   });
    //   return;
    // }

    // if (id) {
    //   updateUser({
    //     body: {
    //       name: detail.name,
    //       email: detail.email,
    //       phone: detail.phone,
    //       id: id,
    //     },
    //   })
    //     .unwrap()
    //     .then(() => {
    //       addToast("User Updated Successfully", {
    //         appearance: "success",
    //         autoDismiss: true,
    //       });
    //       navigate("/");
    //     })
    //     .catch((err) => {
    //       addToast(err.data.info ?? "Cannot update user", {
    //         appearance: "error",
    //         autoDismiss: true,
    //       });
    //     });
    //   return;
    // }

    // adduser({
    //   body: {
    //     name: detail.name,
    //     email: detail.email,
    //     phone: detail.phone,
    //   },
    // })
    //   .unwrap()
    //   .then((payload) => {
    //     dispatch(
    //       userApi.util.updateQueryData("getAllUsers", undefined, (state) => {
    //         state.info.push(payload.info);
    //       })
    //     );
    //     addToast("New User created Successfully", {
    //       appearance: "success",
    //       autoDismiss: true,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     addToast(error.findData.info ?? "Cannot add user", {
    //       appearance: "error",
    //       autoDismiss: true,
    //     });
    //   });

    // navigate("/");
    return;
  };

  return (
    <>
      <Header />
      <div className="w-11/12 mx-auto">
        <form onSubmit={submitFormHandler} encType="multipart/form-data">
          <Div className="mt-20 mb-10 rounded-lg w-6/12 mx-auto">
            <Para  className="text-center font-semibold text-3xl py-[20px] border-b-[1px] border-light-text dark:border-dark-secondary-text">
              Add User
            </Para>
            <div className="flex items-center justify-between gap-8 p-[20px_50px_40px_50px]">
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
                              <img src="user-1.png" alt="upload-icon" />
                            )}
                          </ImageInputDiv>
                          <p className="py-2 px-10 bg-dark-primary dark:bg-light-secondary text-dark-text font-semibold dark:text-light-text outline-none border-none rounded-md cursor-pointer">
                            Browse
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="w-[65%] flex flex-col gap-3">
                <div className="flex gap-5 w-full">
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
                <div className="flex gap-5 w-full items-center">
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
                  Add User
                </button>
              </div>
            </div>
          </Div>
        </form>
      </div>
    </>
  );
}
