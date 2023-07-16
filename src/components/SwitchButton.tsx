import React from "react";
import * as Switch from "@radix-ui/react-switch";
import {BiSun} from "react-icons/bi";
import styled from "styled-components";
import useTheme from "../helper/useTheme";

const SunIcon = styled(BiSun)`
color: ${({theme})=>theme.PRIMARY_TEXT};
`;

const SwitchButton = () => {

  const {toggleTheme}=useTheme()

  const switchHandler=()=>{
    toggleTheme()
  }

  return (
    <form>
      <div className="flex items-center">
        <label
          className="text-white text-[15px] leading-none pr-[7px]"
          htmlFor="darkMode"
        >
          <SunIcon size="22px" />
        </label>
        <Switch.Root
          className="w-[38px] h-[20px] bg-light-primary dark:bg-dark-primary rounded-full relative shadow-[0_0_0_1.5px] focus:shadow-dark-primary focus:dark:shadow-light-primary data-[state=checked]:bg-black data-[state=checked]:dark:data-[state=checked]:bg-black  outline-none cursor-default"
          id="darkMode"
          onClick={switchHandler}
        >
          <Switch.Thumb className="block w-[16px] h-[16px] bg-dark-primary dark:bg-light-primary rounded-full shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[20px] data-[state=checked]:dark:bg-light-primary" />
        </Switch.Root>
      </div>
    </form>
  );
};

export default SwitchButton;
