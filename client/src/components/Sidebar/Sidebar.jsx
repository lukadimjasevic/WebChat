import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Sidebar = ({ links }) => {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isOpen, setIsOpen] = useState(windowWidth > 767 ? true : false);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		const handleWindowResize = () => {
			const width = window.innerWidth;

			if (width > 767) setIsOpen(true);

			setWindowWidth(width);
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		}
	}, []);

    return (
	<div className={`sidebar ${!isOpen ? "closed" : "open"} p-3 rounded bg-custom-secondary`}>
		{windowWidth <= 767 
		?
		<div className="row g-0">
			<div className="col-10"></div>
			<div className="col-2 text-end">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}>
				{isOpen
					? <BiChevronUp size={28} /> 
					: <BiChevronDown size={28} />
				}
				</button>
			</div>
		</div>
		: null}

		<div className="sidebar-content">
			{links.map(({ category, items }, index) => (
				<div key={index}>
					<div className="row row-cols-1 g-0 gap-3 text-uppercase text-highlight">
						<span className="col">{category}</span>
						<hr className="col" />
					</div>
					{items.map((item, index) => (
                        <Link to={item.path}
                            key={index} 
                            className={`
								${ item.name === selectedItem 
                                	? "dashboard-menu-item dashboard-menu-item-selected" 
                                	: "dashboard-menu-item"
								} ${ item.class
									? item.class
									: ""
								}`} 
                            onClick={() => setSelectedItem(item.name)} 
                        >
                            {item.Icon ? <item.Icon size={24} /> : null }
                            <span>{item.name}</span>
                        </Link>
                    ))}
				</div>
			))}
		</div>
	</div>
	);
};

export default Sidebar;
