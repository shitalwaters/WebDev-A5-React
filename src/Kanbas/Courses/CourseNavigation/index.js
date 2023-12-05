import { Link, useParams, useLocation } from "react-router-dom";
import './index.css';


function CourseNavigation() {
    const links = ["Home", "Modules", "Assignments", "Grades"];
    const { courseId } = useParams();
    const { pathname } = useLocation();

    return (
        
        <div className="courseNav-group">
            
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={courseId ? `/Kanbas/Courses/${courseId}/${link}` : `/Kanbas/Courses/${link}`}
                    className={`courseNav-group-item ${pathname.includes(link) ? "active" : ""}`}>
                    {link}
                </Link>
            ))}
        </div>
    );
}


export default CourseNavigation;