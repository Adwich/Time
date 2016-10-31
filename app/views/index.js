var App = React.createClass({
    getInitialState: function() {
        return {
            tasks: []
        }
    },
    componentDidMount: function() {
        // Is there a React-y way to avoid rebinding `this`? fat arrow?
        var th = this;
        this.serverRequest =
            axios.get(this.props.source)
                .then(function(result) {
                    th.setState({
                        tasks: result.data
                    });
                    console.log(result);
                })
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (

            <div>
            <AddTask/>
            {/* Don't have an ID to use for the key, URL work ok? */}
        {this.state.tasks.map(function(job) {
            return (
                <div key={job._id} className="job col-md-8 center-block task-item">
                {job.name} {job.deadline} {job.desc} {job.priority}
            </div>
            );
        })}
        </div>
        )
    }
});

var AddTask = React.createClass({
    render: function() {
        return (
            <h1>Adeeeel</h1>
        )
    }
});
ReactDom.render(<App source="https://api.myjson.com/bins/4kc6q"/>, document.querySelector("#root"));