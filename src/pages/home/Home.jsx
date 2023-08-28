import './home.css';
import ResponsiveAppBar from '../../components/header/header';
import ShowCourses from '../courses/ShowCourses';
import { Box, Paper } from '@mui/material';
import Footer from '../../components/footer/footer';

function Home() {
  return (
    <div>
      <ResponsiveAppBar />
      <Box
      //display={{xs:'none'}}
      sx={{
        width:'auto',
        margin:{xs:'20px 50px 0 50px',md:'20px 100px 20px 100px',lg:'20px 200px 20px 200px'}//'20px 200px 0 200px'
      }}>
        <ShowCourses />
      </Box>
      <Footer/>
    </div>
  );
}

export default Home;