import React from "react";
import { Link, hashHistory } from "react-router";
import merge from "lodash/merge";
import AnswerIndexContainer from "../answers/answer_index_container.jsx";
import NewAnswer from "../answers/new_answer";

class QuestionShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editQuestionClicked: false,
      question: this.props.question,
      answerClicked: false
    };
    this.submitQuestionEdits = this.submitQuestionEdits.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuestion(this.props.params.questionId);
  }

  componentWillReceiveProps(newProps) {
    let newState = merge({}, this.state, { question: newProps.question });
    this.setState(newState);
  }

  deleteQuestion() {
    return e => {
      this.props.deleteQuestion(this.props.question.id);
      hashHistory.push("/");
    };
  }

  submitQuestionEdits(e) {
    e.preventDefault();
    this.props.updateQuestion(this.state.question);
    let newState = merge({}, this.state, { editQuestionClicked: false });
    this.setState(newState);
  }

  update(field) {
    return e => {
      let newState = merge({}, this.state, {
        question: { [field]: e.target.value }
      });
      this.setState(newState);
    };
  }

  updateAnswerClicked(boolean) {
    return e => {
      let newState = merge({}, this.state, { answerClicked: boolean });
      this.setState(newState);
    };
  }

  updateEditQuestionClicked(boolean) {
    return e => {
      let newState = merge({}, this.state, { editQuestionClicked: boolean });
      this.setState(newState);
    };
  }

  questionBody() {
    const { question } = this.props;

    if (this.state.editQuestionClicked === false) {
      return (
        <div>
          <h1>{question.question}</h1>
          <p className="QuestionShowDetails">{question.details}</p>
          <div className="QuestionShowButtonLine">
            <button
              className="NewAnswerButton"
              onClick={this.updateAnswerClicked(true)}
            >
              Answer
            </button>
            <div className="DotsContainer">
              <a className="DotsLink" onClick={this.updateDotsClicked()}>
                <span className="Dots">...</span>
              </a>
              <div>{this.dotsDropDown()}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="EditQuestion">
          <input
            className="EditQuestionTitle"
            type="text"
            value={this.state.question.question}
            onChange={this.update("question")}
          />
          <textarea
            className="EditQuestionDetails"
            value={this.state.question.details}
            onChange={this.update("details")}
            placeholder="Enter question details.."
          />
          <div className="EditQuestionButtonBar">
            <button
              className="CancelButton"
              onClick={this.updateEditQuestionClicked(false)}
            >
              Cancel
            </button>
            <button
              className="EditQuestionSubmit"
              onClick={this.submitQuestionEdits}
            >
              Update
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    const { question } = this.props;

    if (!question) {
      return <div>Loading...</div>;
    }

    return (
      <div className="QuestionShowContainer">
        <div className="QuestionShow">
          <div className="QuestionShowQuestion">
            {this.questionBody()}
            <NewAnswer
              questionId={question.id}
              createAnswer={this.props.createAnswer}
              currentUser={this.props.currentUser}
              answerClicked={this.state.answerClicked}
              closeDropdown={this.updateAnswerClicked(false)}
            />
          </div>
          <AnswerIndexContainer questionId={question.id} />
        </div>
        <div />
      </div>
    );
  }
}

export default QuestionShow;
