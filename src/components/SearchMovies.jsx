import React, {useState} from 'react'
import { Input, Col, Row, Card, Typography } from 'antd';
import { useGetMoviesByTitleQuery } from '../services/movieSearchApi';
import movieLogo from '../images/movie.jpg'

const SearchMovies = () => {

  const {Search} = Input
  const {Title} = Typography
  const [searchValue, setSearchValue] = useState("")
  const onSearch = (value) => setSearchValue(value);
  const {data} = useGetMoviesByTitleQuery(searchValue);

  return (
    <>

    <Title level={2} className="heading">
      Search Movies:
    </Title>
    <Col span={8} offset={8}>
    <Search className='searchInput' placeholder="Search for a movie title" onSearch={onSearch} enterButton />
    </Col>

    <Row gutter={[32,32]}>
      {data?.data?.search?.movies.map((movie) => (
         <Col xs={24} sm={12} lg={6} key={movie.emsId}>      
           <Card title={`${movie.name}`}  style={{
                                          width: 250,
                                          maxHeight: 400,
                                          minHeight: 400}} 
                                          hoverable>
                                            
              <img height={250} className='crypto-image' src={movie?.posterImage?.url ? movie?.posterImage?.url : movieLogo} alt="movie-logo"/>
              {console.log(movie?.posterImage?.url)}
             <p>Price: {movie.name}</p>
           </Card>
         
       
     </Col>
      ))}
    </Row>
    </>
  )

}

export default SearchMovies