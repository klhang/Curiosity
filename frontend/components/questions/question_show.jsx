import React from "react";
import { Link } from "react-router-dom";
import merge from "lodash/merge";
import AnswerIndexContainer from "../answers/answer_index_container.jsx";
import NewAnswer from "../answers/new_answer";
import { ConditionalComponent } from "../../util/route_util";

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
    this.props.fetchQuestion(this.props.match.params.questionId);
  }

  componentWillReceiveProps(newProps) {
    let newState = merge({}, this.state, { question: newProps.question });
    this.setState(newState);
  }

  deleteQuestion() {
    return e => {
      this.props.deleteQuestion(this.props.question.id);
      // hashHistory.push("/");
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
          <br></br>
          <div className="black bold">
            <span className="left-margin-10">{"    " + question.title}</span>
          </div>
          <p className="QuestionShowDescription">{question.description}</p>

          <div className="QuestionShowButtonLine">
            <ConditionalComponent
              trueComponent={() => (
                <div>



                <span className="left-margin-10  ">
                  <a className="Answer accordion-toggle" data-toggle="collapse" data-parent="#accordion2" onClick={this.updateAnswerClicked(true)} role="button">
                    <span className="glyphicon glyphicon-pencil"></span>Answer
                  </a>
                </span>
                  </div>
              )}
              falseComponent={() => <div />}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="EditQuestion">
          <input
            className="EditQuestionTitle"
            type="text"
            value={this.state.question.title}
            onChange={this.update("question")}
          />
          <textarea
            className="EditQuestionDescription"
            value={this.state.question.description}
            onChange={this.update("description")}
            placeholder="Enter question description.."
          />

          {question.myQuestion ? (
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
          ) : (
            ""
          )}
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
            {question.myQuestion ? (
              ""
            ) : (
              ""
            )}
            <ConditionalComponent
              trueComponent={() => (
                <NewAnswer
                  questionId={question.id}
                  createAnswer={this.props.createAnswer}
                  currentUser={this.props.currentUser}
                  answerClicked={this.state.answerClicked}
                />
              )}
              falseComponent={() => <div />}
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
