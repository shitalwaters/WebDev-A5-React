import ModuleList from "../Modules/ModuleList";
import "./index.css"

function Home() {
    return (
        <div className="home-container">
            <ModuleList />
            <div className="sidebar">
                {/* Sidebar content here */}
                <div className="sidebar-item">Import Existing Content</div>
                <div className="sidebar-item">Import from Commons</div>
                <div className="sidebar-item">Choose Home Page</div>
                <div className="sidebar-item">View Course Stream</div>
                <div className="sidebar-item">New Announcement</div>
                <div className="sidebar-item">New Analytics</div>
                <div className="sidebar-item">View Course Notification</div>
                <h5>To Do</h5>
                <div className="sidebar-item" style={{ color: 'red' }}>Grade A1 - ENV + HTML</div>
                <div className="sidebar-item" style={{ color: 'red' }}>Grades A2 - CSS + BOOTSTRAP</div>

                </div>
        </div>
    );
}
export default Home;
