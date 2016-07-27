import TweetBox from "./component/TweetBox"
import TweetList from "./component/TweetList"

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweetsList: [] }
  }
  formattedTweets(tweetsList){
    let formattedList = tweetsList.map(tweet => {
      tweet.formattedDate = moment(tweet.created_at).fromNow();
      return tweet;
    });
    return {
      tweetsList: formattedList
    };
  }
  componentDidMount() {
    $.ajax("/tweets")
    .success(data => this.setState(this.formattedTweets(data)))
    .error(error => console.log(error));
  }
  addTweet(tweetToAddd){
    $.post("/tweets", { body: tweetToAddd})
    .success( savedTweet => {
      let newTweetsList = this.state.tweetsList;
      newTweetsList.unshift(savedTweet);
      this.setState(this.formattedTweets(newTweetsList));
    })
    .error(error => console.log(error));
  }
  render() {
    return(
      <div className ="container">
        <TweetBox sendTweet={this.addTweet.bind(this)} />
        <TweetList tweets={this.state.tweetsList} />
      </div>
    );
  }
}

let documentReady = () =>{
  let reactNode = document.getElementById('main');
  if(reactNode) {
    ReactDOM.render(
        <Main />,
        document.getElementById('main')
    );
  }
};

$(documentReady);
