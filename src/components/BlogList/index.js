import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {blogsData: [], loading: true}

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const dataresponse = await response.json()
    const updateData = dataresponse.map(eachData => ({
      id: eachData.id,
      author: eachData.author,
      avatarUrl: eachData.avatar_url,
      imageUrl: eachData.image_url,
      title: eachData.title,
      topic: eachData.topic,
    }))
    this.setState({blogsData: updateData, loading: false})
  }

  render() {
    const {blogsData, loading} = this.state
    return loading ? (
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </div>
    ) : (
      blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
    )
  }
}

export default BlogList
