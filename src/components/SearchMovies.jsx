import React, {useState} from 'react'
import { Input, Col, Row, Card, Typography } from 'antd';
import {Link} from 'react-router-dom'
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

    <Title level={2} className="heading" style={{marginTop: "30px"}}> 
      Search Movies:
    </Title>
    <Col span={8} offset={6}>
    <Search className='searchInput' placeholder="Search for a movie title" onSearch={onSearch} enterButton />
    </Col>

    <Row gutter={[32,32]}>
      {data?.data?.search?.movies.map((movie) => (
         <Col xs={24} sm={12} lg={6} key={movie.emsId} align="center">
          <Link to={`/movie/${movie.emsVersionId}`}>
          <Card className='movie-search-card' title={`${movie.name}`}  style={{
                                          width: 250,
                                          maxHeight: 400,
                                          minHeight: 400}} 
                                          hoverable
                                          >
                                            
              <img height={250} className='film-image' src={movie?.posterImage?.url ? movie?.posterImage?.url : movieLogo} alt="movie-logo" style={{maxWidth: "200px"}}/>
             <p>User Rating: {movie?.userRating?.dtlLikedScore ? `%${movie?.userRating?.dtlLikedScore}` : "Not Available"}</p>
           </Card>
          </Link>      
     </Col>
      ))}
    </Row>
    </>
  )

}

export default SearchMovies