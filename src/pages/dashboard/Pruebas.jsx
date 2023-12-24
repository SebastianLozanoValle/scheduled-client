import { useEffect, useRef, useState } from "react";

export const Pruebas = () => {

    const tabs = ['Coding', 'JavaScript', 'Podcasts', 'Databases', 'Web Development', 'Unboxing', 'History', 'Programming', 'Gadgets', 'Algorithms', 'Comedy', 'Gaming', 'Share Market', 'Smartphones', 'Data Structure'];
    
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabsBox = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.current.scrollWidth - tabsBox.current.clientWidth;
    // Aquí puedes manejar la visibilidad de tus iconos de flecha
  }

  const dragging = (e) => {
    if(!isDragging) return;
    tabsBox.current.scrollLeft -= e.movementX;
    handleIcons(tabsBox.current.scrollLeft)
  }

  const dragStop = () => {
    setIsDragging(false);
  }

  useEffect(() => {
    const box = tabsBox.current;
    box.addEventListener("mousedown", () => setIsDragging(true));
    box.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    return () => {
      box.removeEventListener("mousedown", () => setIsDragging(true));
      box.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
    }
  }, [isDragging]);
    return (
            <div className="flex overflow-x-hidden" ref={tabsBox}>
        {tabs.map(tab => (
            <div 
            key={tab} 
            className={`p-4 ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActiveTab(tab)}
            >
            {tab}
            </div>
        ))}
        </div>
    );
}