
import { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = (props) => {
  const [clicked, setClicked] = useState("0");

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  return (
    <ul className="accordion">
      {props.items.map((item, index) => (
        <AccordionItem
          onToggle={() => handleToggle(index)}
          active={clicked === index}
          key={index}
          item={item}
          image={item.image ?? null}
          link={item.link ?? null}
          linkDes={item.linkDes ?? null}
        />
      ))}
    </ul>
  );
};

export default Accordion;