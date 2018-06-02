// pages/index.js
    import React from 'react'
    import axios from 'axios'
    import Pusher from 'pusher-js'
    import Chart from '../components/Chart'
    import VoteButtons from '../components/Vote-buttons'

    var pusher = new Pusher('app_key', {
      cluster: 'cluster',
      encrypted: true
    })
    const channel = pusher.subscribe('pet-wars')

    export default class Index extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          data: [0, 0, 0]
        }
      }

    componentDidMount () {
        this.receiveUpdateFromPusher()
      }

      receiveUpdateFromPusher () {
        channel.bind('new-votes', data => {
          this.setState({
            data
          })
        })
        console.log('app subscription to event successful')
      }

      handleVote (data) {
        axios.post('http://localhost:8080/vote', data)
        .then(res => {
          console.log('received by server')
        })
        .catch(error => {
          throw error
        })
      }

      render () {
        return (
          <div>
            <Chart data={this.state.data} />
            <VoteButtons handleVote={this.handleVote.bind(this)} />
          </div>
        )
      }
    }