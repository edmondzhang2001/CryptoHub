import { useEffect, useState } from 'react'
import axios from 'axios'

const News = () => {
    const [articles, setArticles] = useState(null);

    useEffect(()=> {
        const options = {
          method: 'GET',
          url: 'https://crypto-news-live3.p.rapidapi.com/news',
          headers: {
            'x-rapidapi-host': 'crypto-news-live3.p.rapidapi.com',
            'x-rapidapi-key': 'f4cd937ae8msh74db90df8c4dc64p160a08jsn9c40a5f3d047'
          }
        };
        
        axios.request(options).then((response) => {
            console.log(response.data);
            setArticles(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    console.log(articles);

    const first30Articles = articles?.slice(0,30);

    return (
        <div className="news-feed">
            <h2>News Feed</h2>
            {first30Articles?.map((article, _index) => (
                <div key={_index}>
                    <a href={article.url}><p>{article.title}</p></a>
                </div>))}
        </div>
    )
}

export default News
