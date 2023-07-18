import Header from "../components/Header";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../store/apiSlice";
import ToolTip from "../components/Tooltip";
import { Div, Para } from "../globalstyles";
import { useToast } from "../hooks/useToast";

const TableHeader = styled.th`
  padding: 10px 40px;
  text-align: start;
  width: 25%;
  font-weight: 500;
`;

const TableData = styled.td`
  padding: 10px 40px;
  width: 25%;
  font-size: 14px;
`;



export default function Home() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllUsersQuery();
  const { toast } = useToast();

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  console.log(data);

  const viewUserhandler = (id: string) => (e: any) => {
    navigate(`view-user?id=${id}`);
  };

  const editUserHandler = (id: string) => (e: any) => {
    navigate(`add-user?id=${id}`);
  };

  const deleteUserHandler = (id: string) => (e: any) => {
    deleteUser(id)
      .unwrap()
      .then(() => {
        toast({
          title: "Delete User",
          info: "User Deleted Successfully",
          type: "success",
          code: "200",
        });
      })
      .catch((error) => {
        console.log(error);
       toast({
         title: "Delete User",
         info: "Can't Delete User",
         type: "error",
         code: "400",
       });
      });
  };

  return (
    <>
      <Header />
      <div className="w-11/12 mx-auto overflow-scroll">
        {!isLoading ? (
          <Div className="mt-20 mb-10 rounded-lg w-10/12 max-md:w-[800px] mx-auto overflow-scroll">
            {data && !error ? (
              <div>
                <div className="flex justify-between px-10 py-4 font-medium items-center">
                  <Para className="text-2xl font-semibold">All Users</Para>
                  <button
                    onClick={() => navigate("/add-user")}
                    className="p-2 bg-dark-primary dark:bg-light-secondary text-dark-text dark:text-light-text outline-none border-none rounded-md"
                  >
                    Add User
                  </button>
                </div>
                <div>
                  {data.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="flex justify-between bg-dark-primary dark:bg-light-secondary text-dark-text dark:text-light-text">
                          <TableHeader>Name</TableHeader>
                          <TableHeader>Age</TableHeader>
                          <TableHeader>Gender</TableHeader>
                          <TableHeader>Actions</TableHeader>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map(
                          (user: Record<string, any>, index: number) => {
                            let addBorder = "";

                            if (+index !== +data.length - 1) {
                              addBorder =
                                "border-b-[1px] border-light-secondary-text dark:border-dark-secondary-text";
                            }

                            return (
                              <tr
                                key={index}
                                className={`flex box-border items-center justify-between text-light-text dark:text-dark-text font-semibold ${addBorder}`}
                              >
                                <TableData>
                                  {user.name[0].toUpperCase() +
                                    user.name.slice(1, user.name.length)}
                                </TableData>
                                <TableData>{user.age}</TableData>
                                <TableData>
                                  {user.gender[0].toUpperCase() +
                                    user.gender.slice(1, user.gender.length)}
                                </TableData>
                                <TableData>
                                  <div className="flex gap-5">
                                    <div onClick={editUserHandler(user.id)}>
                                      <ToolTip
                                        src="edit.png"
                                        tipString="Edit"
                                      />
                                    </div>
                                    <div onClick={viewUserhandler(user.id)}>
                                      <ToolTip
                                        src="view.png"
                                        tipString="View"
                                      />
                                    </div>
                                    <div onClick={deleteUserHandler(user.id)}>
                                      <ToolTip
                                        src="delete.png"
                                        tipString="Delete"
                                      />
                                    </div>
                                  </div>
                                </TableData>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-2xl pb-10 text-light-text dark:text-dark-text">
                      No Existing Users...
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-2xl py-10 text-light-text dark:text-dark-text">
                Something went wrong...
              </p>
            )}
          </Div>
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

//
