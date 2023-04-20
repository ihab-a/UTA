import React, { useState, useEffect, createRef, Fragment, useRef } from 'react';
import './split.css';

export default function Split(props) {
	// -1 for not resizing
	// used to store the index of first resized element otherwise
  const [resizing, setResizing] = useState(-1);
  const [dimensions, setDimensions] = useState(props.dimensions ?? Array(props.sections.length).fill(undefined));
  const sectionRefs = useRef(props.sections.map(() => createRef()));
  const mousePos = useRef({ x: -1, y: -1 });
  const resizeStart = (event, index) => {
    setResizing(index);
    mousePos.current = { x: event.clientX, y: event.clientY };
  };

  const resize = (event) => {
    if (resizing === -1) return;

    const index = resizing;
    // get current section
    const {current : currentSection} = sectionRefs.current[index];
    const currentSectionHeight = parseInt(getComputedStyle(currentSection).height);
    // calc new height (mouse travel deltha) + currentSectionHeight
    const mouseDeltha = event.clientY - mousePos.current.y;
    let currentSectionNewHeight = mouseDeltha + currentSectionHeight;

    // get next section
    const {current : nextSection} = sectionRefs.current[index + 1];
    const nextSectionHeight = parseInt(getComputedStyle(nextSection).height);
    let nextSectionNewHeight = currentSectionHeight - currentSectionNewHeight + nextSectionHeight;


    // update mouse pos for next resize
    mousePos.current = { x: event.clientX, y: event.clientY };
    if (mouseDeltha < 0 && currentSectionNewHeight <= 50 
    					|| mouseDeltha > 0 && nextSectionNewHeight <= 50){
    	return;
    }

    setDimensions((dimensions) => {
      const newHeights = [...dimensions];
      newHeights[index] = currentSectionNewHeight + 'px';
      newHeights[index + 1] = nextSectionNewHeight + 'px';
      return newHeights;
    });

  };

  const resizeEnd = () => {
    setResizing(-1);
  };

  useEffect(() => {
		document.documentElement.className = resizing !== -1 ? "resizing" : "";
  	if (resizing !== -1){
	    document.addEventListener('mousemove', resize);
	    document.addEventListener('mouseup', resizeEnd);
	  }

	  // cleanup
    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', resizeEnd);
    };
  }, [resizing]);

  useEffect(() => {
  		if (dimensions.every(e => e == undefined)) return;
  		const resizerHeight = document.querySelector(".split-resizer")?.clientHeight;
  		const availableHeight = sectionRefs.current[0].current.parentElement.clientHeight - resizerHeight	* (props.sections.length - 1)
  		console.log(resizerHeight, availableHeight)
  		setDimensions(o => o.map(e => (availableHeight	/ props.sections.length) + 'px'))
  }, [])

  useEffect(() => {
  	console.log(dimensions)
  }, [dimensions])
  return <section className="split-root">
    {
    props.sections.map((section, i) => (
      <Fragment key={i}>
        <section className="split-section" style={{ height: dimensions[i]}} ref={sectionRefs.current[i]}>
          {section}
        </section>
        { 
          i < props.sections.length - 1 
          ? <hr className={`split-resizer ${resizing === i ? "resizer-active" : ""}`}
          			onMouseDown={e => resizeStart(e, i)}
          	/>
          : null 
        }
      </Fragment>
    ))
    }
  </section>;
}
