import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

type SrcType={
    src:string
    tipString:string
}

const ToolTip = (props:SrcType) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="text-light-text dark:text-dark-text hover:bg-violet3 inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-transparent outline-none">
            <img src={props.src} alt="action"/>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-light-text dark:text-light-text select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none will-change-[transform,opacity] font-semibold"
            sideOffset={5}
          >
            {props.tipString}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ToolTip;
