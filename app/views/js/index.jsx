/*
* Point d'entré dans l'application React. C'est ici que tout commence.
*
* Il ne peut y avoir qu'un seul appel de la commande React.Render sur la Div Root.
*
* Tout les autres components doivent être appeler à l'intérieur des class, fonctions
* et composant.
*
* C'est comme un arbre statistique. et la var App est le premier point.
* Dans la même idée, React ne peut faire le rendu de q'un seul élément.
* Exemple avec la variable App
*
* Chaque bloc doit être séparer pour pouvoir les utiliser comme des Légo.
* Tout les components doivent avoir un nom qui commence par une Majuscule
* */

// Variable faisant la requête get et liste les résultats
var TaskListing = React.createClass({
    //Initiale un State
    getInitialState: function() {
        return {
            tasks: []
        }
    },
    //Le composant est monté, est en place
    //Donc on peut lancé la requête get
    componentDidMount: function() {
        // Is there a React-y way to avoid rebinding `this`? fat arrow?
        //commentaire propre à ce bout de code
        var th = this;
        this.serverRequest =
            axios.get(this.props.source)
                .then(function(result) {
                    //On attache les résultats au State tasks
                    //pour pouvoir le récupérer après dans le rendu
                    th.setState({
                        tasks: result.data
                    });
                    //pour validation
                    console.log(result);
                })
    },
    //Lorsque le commposant disparait on arrête la requête
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    //Le rendu du composant TaskLinsting
    render: function() {
        return (
            //Il ne peut retourner qu'un seul élément :
            //ici c'est cette div
            <div>
                {
                    /*Les commentaire à l'intérieur de la div de rendu doivent
                    être entre crochet
                    On  map les résultats obtenu précédement*/
                }
        {this.state.tasks.map(function(job) {
            return (
                /*Le rendu de chaque élément, qu'on va devoir séparer en un nouveau légo*/
                /*TODO Séparer ce component avec un props*/
                <div key={job._id} className="job col-md-8 center-block task-item">
                {job.name} {job.deadline} {job.desc} {job.priority}
            </div>
            );
        })}
        </div>
        )
    }
});

//Le point de départ de l'app
var App = React.createClass({
    render: function () {
        return (
            //encore une fois, un seul élément pour pouvoir en afficher plus
            // à l'intérieur on appel autant que l'on veut
            <div>
                <AddTask/>
                {
                    /*ici source est un props; un paramètre que l'on passe au
                     * composant. Ici l'url où faire la requête Get*/
                }
                <TaskListing source="http://localhost:8888/api/tasks"/>
            </div>
        //<TaskListing source="https://api.myjson.com/bins/4kc6q"/>
        )
    }
});

const reactFormContainer = document.querySelector('.react-form-container');

class ReactFormLabel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
        )
    }
}

//formulaire et requête d'ajout d'une tâche
class AddTask extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            priority: '',
            deadline: '',
            desc: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let newState = {};

        newState[e.target.name] = e.target.value;

        this.setState(newState);
    };

    handleSubmit(e, message) {
        e.preventDefault();

        let formData = {
            name: this.state.name,
            priority: this.state.priority,
            deadline: this.state.deadline,
            desc: this.state.desc
        }

        if (formData.name.length < 1 || formData.priority.length < 1 || formData.deadline.length < 1 || formData.desc.length < 1) {
            return false;
        }

        axios.post('http://localhost:8888/api/tasks',
            formData)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });

        this.setState({
            name: '',
            priority: '',
            deadline: '',
            desc: ''
        });
    };

    render() {
        return(
            <form className='react-form' onSubmit={this.handleSubmit}>
                <h1>Say Hi!</h1>
                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formName' title='Task Name:' />

                    <input id='formName' className='form-input' name='name' type='text' ref='formName' required onChange={this.handleChange} value={this.state.name} />
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formPriority' title='Priority :' />

                    <input id='formpriority' className='form-input' name='priority' type='text' required onChange={this.handleChange} value={this.state.priority} />
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formDeadline' title='Deadline:'/>

                    <input id='formDeadline' className='form-input' name='deadline' type='text' required onChange={this.handleChange} value={this.state.subject} />
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formDescription' title='Description :' />

                    <textarea id='formDescription' className='form-textarea' name='desc' required onChange={this.handleChange}></textarea>
                </fieldset>

                <div className='form-group'>
                    <input id='formButton' className='btn' type='submit' placeholder='Add task' />
                </div>
            </form>
        )
    }
}

//Le point de départ, Rendu réel de l'appli dans la div mère -> root.
ReactDom.render(<App/>, document.querySelector("#root"));