import { useRef } from "react";

const headerRef = useRef<HTMLElement>(null);
const buttonUpRef = useRef<HTMLButtonElement>(null);

const handleScroll = () => {
  headerRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center",
  });
};

export { headerRef, buttonUpRef, handleScroll };
