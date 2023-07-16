import styled from "styled-components";
import SwitchButton from "./SwitchButton";

const Container = styled.div`
  padding: 20px 0;
  /* color: ${({ theme }) => theme.PRIMARY_TEXT}; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.PRIMARY_TEXT};
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default function Header() {
  return (
    <>
      <div className="shadow-[0_0.1px_20px] shadow-dark-secondary dark:shadow-[0_0.4px_0.4px] dark:shadow-light-secondary">
        <Container className="w-11/12 mx-auto">
          <Link href="/">
            <img src="user.png" width="35px" alt="userImage" />
            UserLog
          </Link>
          <SwitchButton />
        </Container>
      </div>
    </>
  );
}
