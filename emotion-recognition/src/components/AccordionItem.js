import { useRef } from "react";

const AccordionItem = ({ item, active, onToggle, image, link, linkDes }) => {
  const { title, description } = item;

  const contentEl = useRef();

  return (
    <li className={`accordion_item ${active ? "active" : ""}`}>
      <button className="button" onClick={onToggle}>
        {title}
        <span className="control">{active ? "—" : "+"} </span>
      </button>
      <div
        ref={contentEl}
        className="answer_wrapper"
        style={
          active
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        {image ? 
          <img href={image} alt="accordian"/>
          : null
        }
        <div className="answer">{description}</div>
        {link ? 
            <a href={link} target="_blank">{linkDes}</a>
          : null
        }
      </div>
    </li>
  );
};

export default AccordionItem;