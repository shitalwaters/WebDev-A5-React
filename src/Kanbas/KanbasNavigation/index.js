import { Link, useLocation } from "react-router-dom";
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChartPie, faBook, faCalendarAlt, faInbox, faClock, faPlay, faArrowCircleRight, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function KanbasNavigation() {
    const links = [
        { name: "Account", icon: faUserCircle },
        { name: "Dashboard", icon: faChartPie },
        { name: "Courses", icon: faBook },
        { name: "Calendar", icon: faCalendarAlt },
        { name: "Inbox", icon: faInbox },
        { name: "History", icon: faClock },
        { name: "Studio", icon: faPlay },
        { name: "Commons", icon: faArrowCircleRight },
        { name: "Help", icon: faQuestionCircle }

    ];
    const { pathname } = useLocation();
    // Function to determine if a link is active
    const isActive = (linkName) => {
        if (linkName === "Courses" && pathname.startsWith("/Kanbas/Courses")) {
            return true;
        }
        return pathname === `/Kanbas/${linkName}`;
    };
    return (
        <div className="kanbasNav-group">
            {links.map((link, index) => (
                <Link
                key={index}
                to={`/Kanbas/${link.name}`}
                className={`kanbasNav-group-item ${isActive(link.name) ? "active" : ""}`}>
                    {/* Container to stack the icons above the name */}
                    <div className="kanbasNav-content">
                        <FontAwesomeIcon icon={link.icon} className="link-icon" />
                        <div>{link.name}</div> {/* Text below the icon */}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default KanbasNavigation;
