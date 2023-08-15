import './home.css';
import ResponsiveAppBar from '../../components/header/header';
import ShowCourses from '../courses/ShowCourses';

function Home() {
  return (
    <div>
      <ResponsiveAppBar />
      <ShowCourses />
    </div>
  );
}

export default Home;